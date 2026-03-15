#!/usr/bin/env bash
# Regenerate layout-debug WEBMs: trim to key action, smooth motion, ~3s duration
# Usage: bash regenerate-smooth.sh
set -euo pipefail

DIR="$(cd "$(dirname "$0")" && pwd)"
BACKUP="$DIR/backup-$(date +%Y%m%d%H%M%S)"
mkdir -p "$BACKUP"

# Backup originals
for f in nav-shift-before-annotated.webm nav-shift-after-annotated.webm \
         state-flicker-before-annotated.webm state-flicker-after-annotated.webm \
         full-journey-before-annotated.webm full-journey-after-annotated.webm; do
  [ -f "$DIR/$f" ] && cp "$DIR/$f" "$BACKUP/$f"
done
echo "Backed up originals to $BACKUP"

# Function: process a clip
# Args: input output trim_start trim_end speed_factor target_fps
process_clip() {
  local input="$1" output="$2" ss="$3" to="$4" speed="$5" fps="${6:-30}"
  local tmp="/tmp/webm-proc-$(basename "$output" .webm).webm"
  
  echo "Processing $(basename "$output")..."
  echo "  Trim: ${ss}s → ${to}s, Speed: ${speed}x, FPS: ${fps}"
  
  # Step 1: Trim + speed up with frame interpolation for smoothness
  # minterpolate creates new frames between existing ones for smooth motion
  ffmpeg -y -ss "$ss" -to "$to" -i "$input" \
    -vf "setpts=PTS/${speed},minterpolate=fps=${fps}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1" \
    -c:v libvpx-vp9 -b:v 2M -crf 20 -pix_fmt yuv420p \
    -an -auto-alt-ref 0 \
    "$tmp" 2>/dev/null
  
  # Verify duration
  local dur
  dur=$(ffprobe -v quiet -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$tmp")
  echo "  Output duration: ${dur}s"
  
  mv "$tmp" "$output"
  echo "  Done: $(basename "$output")"
}

echo ""
echo "=== Processing nav-shift clips ==="
# Nav-shift: key action at 0.5s-4.5s (dock + undock cycle), speed 1.3x → ~3.1s
process_clip "$BACKUP/nav-shift-before-annotated.webm" "$DIR/nav-shift-before-annotated.webm" \
  0.5 4.0 1.2 30

process_clip "$BACKUP/nav-shift-after-annotated.webm" "$DIR/nav-shift-after-annotated.webm" \
  0.5 4.0 1.2 30

echo ""
echo "=== Processing state-flicker clips ==="
# State-flicker: key action at 3s-9s (flicker zone), speed 2x → ~3s
process_clip "$BACKUP/state-flicker-before-annotated.webm" "$DIR/state-flicker-before-annotated.webm" \
  3.0 9.0 2.0 30

process_clip "$BACKUP/state-flicker-after-annotated.webm" "$DIR/state-flicker-after-annotated.webm" \
  3.0 9.0 2.0 30

echo ""
echo "=== Processing full-journey clips ==="
# Full-journey: start from 0s for context, trim to 6.5s, speed 2x → ~3.25s
process_clip "$BACKUP/full-journey-before-annotated.webm" "$DIR/full-journey-before-annotated.webm" \
  0.0 6.5 2.0 30

process_clip "$BACKUP/full-journey-after-annotated.webm" "$DIR/full-journey-after-annotated.webm" \
  0.0 6.5 2.0 30

echo ""
echo "=== Summary ==="
for f in nav-shift-before-annotated.webm nav-shift-after-annotated.webm \
         state-flicker-before-annotated.webm state-flicker-after-annotated.webm \
         full-journey-before-annotated.webm full-journey-after-annotated.webm; do
  dur=$(ffprobe -v quiet -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$DIR/$f")
  fps=$(ffprobe -v quiet -show_entries stream=r_frame_rate -of default=noprint_wrappers=1:nokey=1 "$DIR/$f")
  size=$(du -h "$DIR/$f" | cut -f1)
  echo "  $f: ${dur}s @ ${fps}fps (${size})"
done
echo "Done!"

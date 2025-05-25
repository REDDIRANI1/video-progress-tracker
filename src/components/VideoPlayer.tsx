import  { useEffect, useRef, useState } from 'react';

const VIDEO_ID = 'lecture-101';

type Interval = [number, number];

function mergeIntervals(intervals: Interval[]): Interval[] {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged: Interval[] = [];
  for (const interval of sorted) {
    if (!merged.length || merged[merged.length - 1][1] < interval[0]) {
      merged.push(interval);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], interval[1]);
    }
  }
  return merged;
}

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [watched, setWatched] = useState<Interval[]>([]);
  const [lastTime, setLastTime] = useState(0);
  const [progress, setProgress] = useState(0);

  // Load saved progress
  useEffect(() => {
    const data = localStorage.getItem(VIDEO_ID);
    if (data) {
      const { intervals, lastPosition } = JSON.parse(data);
      setWatched(intervals);
      setLastTime(lastPosition);
    }
  }, []);

  // Resume last time
  useEffect(() => {
    if (videoRef.current && lastTime > 0) {
      videoRef.current.currentTime = lastTime;
    }
  }, [lastTime]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = Math.floor(videoRef.current.currentTime);
    const newInterval: Interval = [current, current + 1];

    const updated = mergeIntervals([...watched, newInterval]);
    setWatched(updated);

    const duration = videoRef.current.duration;
    const totalWatched = updated.reduce((sum, [start, end]) => sum + (end - start), 0);
    const percentage = (totalWatched / duration) * 100;
    setProgress(Math.min(100, Math.round(percentage)));

    // Save to localStorage
    localStorage.setItem(
      VIDEO_ID,
      JSON.stringify({
        intervals: updated,
        lastPosition: current,
      })
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Lecture Video</h2>
      <video
        ref={videoRef}
        width="640"
        height="360"
        controls
        onTimeUpdate={handleTimeUpdate}
        style={{ borderRadius: '10px', border: '1px solid #ccc' }}
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={{ marginTop: 10 }}>
        <strong>Progress:</strong> {progress}%
        <div
          style={{
            height: '10px',
            width: '100%',
            background: '#eee',
            marginTop: '5px',
            borderRadius: '5px',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: '#fe8c00',
              borderRadius: '5px',
            }}
          />
        </div>
      </div>
    </div>
  );
}

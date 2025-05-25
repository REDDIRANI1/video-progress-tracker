# 🎓 Smart Video Progress Tracker

A React-based video player that tracks **unique watched intervals**, ensuring progress only increases when **new** parts of the video are viewed.


## 🚀 Features

- ✅ Only tracks **new** seconds of video watched
- 🔁 Skipping or rewatching **does not increase progress**
- 💾 **Persists** progress (localStorage-based)
- 🎯 Auto-resumes playback from last watched position
- 📊 Shows real-time progress as a percentage


## 🛠️ Setup Instructions

1. Clone the repository
git clone https://github.com/yourusername/video-progress-tracker.git
cd video-progress-tracker
npm install
npm run dev

2.📐 Design Documentation
🎯 Objective
Accurately track how much of a lecture video a user has really watched by:
Recording unique time intervals viewed
Merging overlaps
Persisting viewing history across sessions

3.💡 How It Works
 ✅ Tracking Watched Intervals
We monitor the video’s onTimeUpdate event and record every second the user watches:
If the user plays from 12s to 17s, we record [12, 17].
If they later rewatch 14s to 16s, no new time is counted.

4.🧩 Merging Intervals (Unique Progress)
We store each watched second in a Set, so duplicate views are automatically ignored. No need to manually merge overlapping intervals — just count the size of the set.

5. 💾 Persistent Progress (Saving & Resuming)
We use localStorage to:
Save the Set of watched seconds as an array
Save the last playback position
Resume from this data when the user revisits

6. 📉 Edge Case Handling
Skipped time: Not counted unless it's played
Rewatching: Not re-counted
Pausing: Does not affect progress
Refresh/resume: Restores the watched seconds and playback time

7.🧠 Challenges & Solutions
Challenge	                                                    Solution
Avoiding duplicate progress when rewatching	       Used Set<number> to store each unique second
Persisting interval data                         	 Saved as JSON in localStorage
Fast-forwarding	                                   Only count time during playback via onTimeUpdate
Merging intervals	                                 Not needed — Set handles uniqueness automatically

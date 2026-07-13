(function () {
  "use strict";

  var context;
  var masterGain;
  var isPlaying = false;
  var timer;
  var button;
  var chords = [[261.63, 329.63, 392.0], [220.0, 261.63, 329.63], [174.61, 220.0, 261.63], [196.0, 246.94, 293.66]];
  var chordIndex = 0;

  function updateButton() {
    button.setAttribute("aria-pressed", String(isPlaying));
    button.setAttribute("aria-label", isPlaying ? "배경 음악 끄기" : "배경 음악 켜기");
    button.innerHTML = isPlaying ? '<i data-lucide="volume-2"></i>' : '<i data-lucide="volume-x"></i>';
    if (window.lucide) { lucide.createIcons({ nodes: [button] }); }
  }

  function playChord() {
    if (!isPlaying) { return; }
    var now = context.currentTime;
    chords[chordIndex].forEach(function (frequency, index) {
      var oscillator = context.createOscillator();
      var gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(index === 0 ? 0.04 : 0.025, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.7);
      oscillator.connect(gain).connect(masterGain);
      oscillator.start(now);
      oscillator.stop(now + 3.8);
    });
    chordIndex = (chordIndex + 1) % chords.length;
  }

  function start() {
    if (!context) {
      context = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = context.createGain();
      masterGain.gain.value = 0.22;
      masterGain.connect(context.destination);
    }
    context.resume();
    isPlaying = true;
    playChord();
    timer = window.setInterval(playChord, 4000);
    updateButton();
  }

  function stop() {
    isPlaying = false;
    window.clearInterval(timer);
    updateButton();
  }

  function toggle() {
    if (isPlaying) { stop(); } else { start(); }
  }

  function initialise() {
    button = document.createElement("button");
    button.className = "bgm-toggle";
    button.type = "button";
    button.addEventListener("click", toggle);
    document.body.appendChild(button);
    updateButton();
    document.addEventListener("pointerdown", function () {
      if (!isPlaying) { start(); }
    }, { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialise);
  } else {
    initialise();
  }
}());

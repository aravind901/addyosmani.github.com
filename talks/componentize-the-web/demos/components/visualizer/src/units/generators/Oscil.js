/**
 * @class Oscil
 */
WX.Oscil = function(json) {
  WX.Unit.Generator.call(this);
  Object.defineProperties(this, {
    _oscil: {
      enumerable: false,
      writable: false,
      value: WX._context.createOscillator()
    },
    _defaults: {
      value: {
        frequency: 440,
        type: "sine",
        gain: 1.0
      }
    },
    modulationTarget: {
      enumerable: true,
      writable: true,
      value: {
        frequency: null,
        gain: null
      }
    }
  });
  this._oscil.connect(this._outputGain);
  this._oscil.start(0);
  // declare modulation targets (not exposed in r5)
  // this.modulationTarget.frequency = this._oscil.frequency;
  // this.modulationTarget.gain = this._outputGain.gain;
  // default behavior
  this.params = this._defaults;
  if (typeof json === "object") {
    this.params = json;
  }
  this.label += "Oscil";
  // exp feature
  WX.bindParam.call(this, "mfreq", this._oscil.frequency);
};

WX.Oscil.prototype = Object.create(WX.Unit.Generator.prototype, {
  frequency: {
    enumerable: true,
    get: function() {
      return this._oscil.frequency.value;
    },
    set: function(value) {
      // this._oscil.frequency.value = value;
      this._oscil.frequency.cancelScheduledValues(0);
      this._oscil.frequency.setValueAtTime(value, 0);
    }
  },
  glide: {
    value: function(frequency, duration) {
      var now = WX._context.currentTime,
          f = this._oscil.frequency;
      f.setValueAtTime(f.value, now);
      f.linearRampToValueAtTime(frequency, now + duration);
    }
  },
  pitch: {
    enumerable: true,
    get: function() {
      return WX.freq2pitch(this._oscil.frequency.value);
    },
    set: function(pitch) {
      this._oscil.frequency.value = WX.pitch2freq(pitch);
    }
  },
  type: {
    enumerable: true,
    get: function() {
      return this._oscil.type;
    },
    set: function(value) {
      // TODO: sanity check for type
      if (value === undefined) {
        return;
      }
      // shim for legacy enum support
      var t;
      switch(value) {
        case "sine":
        case 0:
          t = 0;
          break;
        case "square":
        case 1:
          t = 1;
          break;
        case "sawtooth":
        case 2:
          t = 2;
          break;
        case "triangle":
        case 3:
          t = 3;
          break;
        default:
          t = 0;
          break;
      }
      this._oscil.type = t;
    }
  }
});
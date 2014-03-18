/**
 * @class ModLPF
 * @description time-varying LPF with some options
 *              : switch on 12/24 roll off, adsr enveloping cutoff
 */
WX.ModLPF = function(json) {
  WX.Unit.Processor.call(this);
  this.label += "ModLPF";
  Object.defineProperties(this, {
    _lpf1: {
      enumerable: false,
      writable: false,
      value: WX._context.createBiquadFilter()
    },
    _lpf2: {
      enumerable: false,
      writable: false,
      value: WX._context.createBiquadFilter()
    },
    _cutoff: {
      writable: true,
      value: 1000
    },
    _Q: {
      writable: true,
      value: 10
    },
    _a: {
      writable: true,
      value: 0.005
    },
    _d: {
      writable: true,
      value: 0.015
    },
    _tauDecay: {
      writable: true,
      value: -0.015 / Math.log(0.001)
    },
    _s: {
      writable: true,
      value: 0.35
    },
    _r: {
      writable: true,
      value: 0.015
    },
    _tauRelease: {
      writable: true,
      value: -0.05 / Math.log(0.001)
    },
    _running: {
      writable: true,
      value: false
    },
    _range: {
      writable: true,
      value: 1000
    },
    _defaults: {
      value: {
        cutoff: 1000,
        Q: 10,
        range: 1000,
        a: 0.015,
        d: 0.015,
        s: 0.3,
        r: 0.05
      }
    }
  });
  this._inputGain.connect(this._lpf1);
  this._lpf1.connect(this._lpf2);
  this._lpf2.connect(this._outputGain);
  this._lpf1.type = this._lpf2.type = 0; // low-pass
  this.params = this._defaults;
  if (typeof json === "object") {
    this.params = json;
  }
};

WX.ModLPF.prototype = Object.create(WX.Unit.Processor.prototype, {
  cutoff: {
    enumerable: true,
    get: function() {
      return this._cutoff;
    },
    set: function(value) {
      this._cutoff = value;
    }
  },
  Q: {
    enumerable: true,
    get: function() {
      return this._Q;
    },
    set: function(value) {
      this._Q = value;
      this._lpf1.Q.value = this._Q;
      this._lpf2.Q.value = this._Q;
    }
  },
  a: {
    enumerable: true,
    get: function() {
      return this._a;
    },
    set: function(value) {
      this._a = value;
    }
  },
  d: {
    enumerable: true,
    get: function() {
      return this._d;
    },
    set: function(value) {
      this._d = value;
      this._tauDecay = -this._d / Math.log(0.001);
    }
  },
  s: {
    enumerable: true,
    get: function() {
      return this._s;
    },
    set: function(value) {
      this._s = value;
    }
  },
  r: {
    enumerable: true,
    get: function() {
      return this._r;
    },
    set: function(value) {
      this._r = value;
      this._tauRelease = -this._r / Math.log(0.001);
    }
  },
  running: {
    enumerable: true,
    get: function() {
      return this._running;
    }
  },
  range: {
    enumerable: true,
    get: function() {
      return this._range;
    },
    set: function(value) {
      this._range = value;
    }
  },
  noteOn: {
    value: function(time) {
      var t = (time || WX.now),
          f1 = this._lpf1.frequency,
          f2 = this._lpf2.frequency;
      // reset envelopes
      f1.cancelScheduledValues(t);
      f1.setValueAtTime(this._cutoff, t);
      // f1.linearRampToValueAtTime(this._cutoff, t);
      f2.cancelScheduledValues(t);
      f2.setValueAtTime(this._cutoff, t);
      // f2.linearRampToValueAtTime(this._cutoff, t);
      // start attack and decay
      var p = this._cutoff + this._range;
      f1.linearRampToValueAtTime(p, t + this._a);
      f1.setTargetValueAtTime(p * this._s, t + this._a, this._tauDecay);
      f2.linearRampToValueAtTime(p, t + this._a);
      f2.setTargetValueAtTime(p * this._s, t + this._a, this._tauDecay);
      this._running = true;
    }
  },
  noteOff: {
    value: function(time) {
      var t = (time || WX.now),
          f1 = this._lpf1.frequency,
          f2 = this._lpf2.frequency;
      // forced stopping
      f1.cancelScheduledValues(t);
      // f1.setValueAtTime(f1.value, t);
      f2.cancelScheduledValues(t);
      // f2.setValueAtTime(f2.value, t);
      // start release phase
      f1.setTargetValueAtTime(this._cutoff, t, this._tauRelease);
      f2.setTargetValueAtTime(this._cutoff, t, this._tauRelease);
      this._running = false;
    }
  }
});
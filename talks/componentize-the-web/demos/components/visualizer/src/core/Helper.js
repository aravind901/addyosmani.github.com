/**
 * @file utility constants and functions for various tasks
 */


Object.defineProperties(WX, {

  /**
   * @memberOf WX
   * @constant PI
   * @desc equivalent of Math.PI
   */
  PI: {
    value: Math.PI
  },

  /**
   * @memberOf WX
   * @constant TWOPI
   * @desc equivalent of Math.PI * 2
   */
  TWOPI: {
    value: Math.PI * 2
  },

  /**
   * @memberOf WX
   * @constant EPS
   * @desc epsilon number, equivalent of Number.MIN_VALUE
   */
  EPS: {
    value: Number.MIN_VALUE
  },

  /**
   * @memberOf WX
   * @constant NoteName
   * @desc MIDI note name dictionary (A0~C8)
   */
  NoteName: {
    value: {
      A0: 21, B0: 23,
      C1: 24, D1: 26, E1: 28, F1: 29, G1: 31, A1: 33, B1: 35,
      C2: 36, D2: 38, E2: 40, F2: 41, G2: 43, A2: 45, B2: 47,
      C3: 48, D3: 50, E3: 52, F3: 53, G3: 55, A3: 57, B3: 59,
      C4: 60, D4: 62, E4: 64, F4: 65, G4: 67, A4: 69, B4: 71,
      C5: 72, D5: 74, E5: 76, F5: 77, G5: 79, A5: 81, B5: 83,
      C6: 84, D6: 86, E6: 88, F6: 89, G6: 91, A6: 93, B6: 95,
      C7: 96, D7: 98, E7: 100, F7: 101, G7: 103, A7: 105, B7: 107,
      C8: 108
    }
  },

  /**
   * returns a float random number within range
   * @memberOf WX
   * @method
   * @param {float} min minimum boundary
   * @param {float} max maximum boundary
   * @returns {float} floating point random number
   */
  random2f: {
    value: function(min, max) {
      return min + Math.random() * (max - min);
    }
  },

  /**
   * returns an integer random number within range
   * @memberOf WX
   * @method
   * @param {float} min minimum boundary
   * @param {float} max maximum boundary
   * @returns {int} integer random number
   */
  random2: {
    value: function(min, max) {
      return Math.round(min + Math.random() * (max - min));
    }
  },

  /**
   * converts MIDI pitch to frequency
   * @memberOf WX
   * @method
   * @param {float} pitch MIDI pitch (commonly in range of 0~127)
   * @returns {float} frequency in Hz
   */
  pitch2freq: {
    value: function(pitch) {
      return 440.0 * Math.pow(2, ((Math.floor(pitch) - 69) / 12));
    }
  },

  /**
   * converts frequency to MIDI pitch
   * @memberOf WX
   * @method
   * @param {float} freq frequency in Hz
   * @returns {int} MIDI pitch
   */
  freq2pitch: {
    value: function(freq) {
      return Math.floor(69 + 12 * Math.log(freq / 440.0) / Math.log(2));
    }
  },

  /**
   * converts linear amplitude to decibel
   * @memberOf WX
   * @method
   * @param {float} amp amplitude (commonly in range of 0.0~1.0)
   * @returns {float} decibel (in 0dBFS)
   * @note if below -100dB, set to -100dB to prevent taking log of zero
   */
  lin2db: {
    value: function(amp) {
      // if below -100dB, set to -100dB to prevent taking log of zero
      return 20.0 * (amp > 0.00001 ? (Math.log(amp) / Math.LN10): -5.0);
    }
  },

  /**
   * converts decibel to linear amplitude
   * @memberOf WX
   * @method
   * @param {float} db decibel (in 0dBFS)
   * @returns {float} amplitude
   */
  db2lin: {
    value: function(db) {
     return Math.pow(10.0, db / 20.0);
    }
  },

  // WAAX logging helper (for internal usage)
  info: {
    value: function(object, message) {
      console.log("[WX:" + object.label + "] Info: " + message);
    }
  },
  warn: {
    value: function(object, message) {
      console.log("[WX:" + object.label + "] Warning: " + message);
    }
  },
  error: {
    value: function(object, message) {
      var msg = "[WX:" + object.label + "] Error: " + message;
      throw new Error(msg);
    }
  }

});
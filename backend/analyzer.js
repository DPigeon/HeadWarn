/*
 * Analyzer for the face recognition
 */

function analyze(joints) {
  /*
   * Separate into x, y coordinates
   */
  let x = []; // 0, 2, ... even numbers
  let y = []; // 1, 3, ... odd numbers

  for (var i = 0; i < joints.length; i++) {
    for (var j = 0; j < joints.length; j++) {
      if (j % 2 === 0) x[i] = joints[j];
      else y[i] = joints[j];
    }
  }

  /*
   * Flip y values
   */
  for (var i = 0; i < joints.length; i++) {
    y[i] = -y[i];
  }

  /*
   * Map indices into the right face part
   */
}

module.exports = { analyze };

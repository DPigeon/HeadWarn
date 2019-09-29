const { comparePics } = require("./config/compare");

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
      else y[i] = -joints[j]; // Flipping y values
    }
  }

  /*
   * Map indices into the right face part
   */
  // Coordinates
  let topMouth = [joints[0], joints[1]];
  let chin = [joints[2], joints[3]];
  let middleOfEyes = [joints[4], joints[5]];
  let leftShoulder = [joints[6], joints[7]];
  let rightShoulder = [joints[8], joints[9]];
  let nose = [joints[10], joints[11]];
  let leftEye = [joints[12], joints[13]];
  let leftEar = [joints[14], joints[15]];
  let rightEye = [joints[16], joints[17]];
  let rightEar = [joints[18], joints[19]];

  if (leftEye[1] < comparePics && rightEye[1] < comparePics) return 0; // Tired
  if (leftEye[1] >= comparePics && rightEye[1] >= comparePics) return 1; // Awake, fine
}

module.exports = { analyze };

/**
 * Launches a new AMI from AWS EC2
 *
 * @method     createData
 * @param      {number}  sampleSize population size
 * @return     {Array}   random data
 */
exports.launchAMI = function(amiId) {
  return amiId;
};

/**
 * Launches a new AMI from AWS EC2
 *
 * @method     createData
 * @param      {number}  sampleSize population size
 * @return     {Array}   random data
 */
exports.getRunningServers = function(amiId) {
  return amiId;
};

/**
 * Get the color for a graph set
 *
 * @method     getColor
 * @param      number  index of the array
 * @return     string with RGBA color value for chart
 */
exports.getColor = function(index){
  colors = [
    'rgba(26, 143, 32, .7)',
    'rgba(194, 227, 27, .7)', // Neon Green
    'rgba(27, 177, 227, .7)', // Light Blue
    'rgba(174, 27, 227, .7)', // Purple
    'rgba(227, 27, 51, .7)',  // Red
    'rgba(237, 83, 0, .7)',   // Orange
    'rgba(0, 237, 198, .7)',  // Turquoise
    'rgba(26, 143, 32, .7)',
    'rgba(26, 143, 32, .7)',
    'rgba(26, 143, 32, .7)',
    'rgba(26, 143, 32, .7)'
  ];

  return colors[index];
}
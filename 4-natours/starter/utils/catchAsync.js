// OPTION 1
// module.exports = (fn) => {
//     return (req, res, next) => {
//         fn(req, res, next).catch(next);
//     };
// };

// OPTION 2 (much cleaner)
// 2 double arrow functions because a function (fn) returns a function (req, res, next) which returns a promise
module.exports = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next);
};

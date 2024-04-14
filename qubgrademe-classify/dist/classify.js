"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classify = void 0;
function classify(m1, m2, m3, m4, m5) {
    const user_mark = m1 + m2 + m3 + m4 + m5 / 5;
    if (user_mark >= 70) {
        return "Distinction";
    }
    else if (user_mark >= 60 && user_mark < 70) {
        return "Commendation";
    }
    else if (user_mark >= 50 && user_mark < 60) {
        return "Pass";
    }
    else if (user_mark >= 40 && user_mark < 50) {
        return "Marginal Fail";
    }
    else if (user_mark >= 30 && user_mark < 40) {
        return "Fail";
    }
    else if (user_mark <= 30) {
        return "Low Fail";
    }
    else {
        return "Sorry could not process grade, please try again!";
    }
}
exports.classify = classify;
;

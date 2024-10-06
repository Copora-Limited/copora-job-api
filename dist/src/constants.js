"use strict";
// src/constants.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingStatus = exports.AccountStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "admin";
    UserRole["Employer"] = "employer";
    UserRole["Applicant"] = "applicant";
})(UserRole || (exports.UserRole = UserRole = {}));
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["ACTIVE"] = "active";
    AccountStatus["INACTIVE"] = "inactive";
})(AccountStatus || (exports.AccountStatus = AccountStatus = {}));
var OnboardingStatus;
(function (OnboardingStatus) {
    OnboardingStatus["InvitationSent"] = "Invitation Sent";
    OnboardingStatus["OnboardingNotCompleted"] = "Onboarding not Completed";
    OnboardingStatus["OnboardingCompleted"] = "Onboarding Completed";
    OnboardingStatus["Approved"] = "Approved";
})(OnboardingStatus || (exports.OnboardingStatus = OnboardingStatus = {}));
// export enum Status {
//   InvitationSent = 1,
//   OnboardingNotCompleted,
//   OnboardingCompleted,
//   Approved,
// }

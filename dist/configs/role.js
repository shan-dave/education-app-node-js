'use strict';
const roles = ['Super-Admin', 'School-Admin', 'Teacher', 'School-Sub-Admin'];
const roleRights = new Map();
roleRights.set(roles[0], ['logout', 'get-user-profile', 'dashbord', 'create-endorsement',
    'get-school-sub-admin', 'delete-school-sub-admin', 'update-school-sub-admin',
    'create-school-sub-admin', 'delete-school', 'get-school-admin',
    'update-school', 'get-school', 'create-school',
    'delete-school-admin', 'create-school-admin', 'update-school-admin',
    'role-list', 'insert-csv', 'insert-country',
    'insert-state', 'insert-disctict', 'delete-country',
    'delete-state', 'delete-district', 'country-list',
    'state-list', 'district-list', 'assign-school',
    'update-endorsement', 'delete-endorsement', 'active-subject', 'get-endorsement',
    'activate-school-admin', 'activate-school', 'activate-school-sub-admin', 'unassign-school',
    'create-teacher', 'update-teacher', 'delete-teacher', 'activate-teacher', 'get-teacher',
    'update-admin-user', 'get-admin-user', 'send-mail-reset-password', 'change-password',
    'create-student-dashbord-que', 'update-student-dashbord-que', 'delete-student-dashbord-que',
    'get-student-dashbord-que', 'active-student-dashbord-que', 'change-state-status', 'change-district-status',
    'create-student', 'check_default-que', 'get-student-dashbord-queans-list', 'change-endorsement-status',
    'update-student', 'delete-student', 'activate-student', 'get-student', 'create-report', 'update-report', 'delete-report',
    'activate-report', 'get-student', 'create-grade', 'grade-list', 'change-grade-status', 'delete-grade'
]);
roleRights.set(roles[1], ['logout', 'assign-teacher', 'dashbord', 'get-user-profile', 'get-school-sub-admin',
    'delete-school-sub-admin', 'update-school-sub-admin', 'create-school-sub-admin',
    'country-list', 'state-list', 'district-list',
    'update-school-admin', 'create-teacher', 'update-teacher', 'delete-teacher',
    'activate-teacher', 'get-school', 'get-endorsement', 'get-teacher', 'send-mail-reset-password', 'change-password',
    'create-student', 'get-student-dashbord-queans-list', 'get-student-dashbord-que', 'update-student', 'delete-student',
    'activate-student', 'get-student', 'create-report', 'update-report', 'delete-report',
    'activate-report', 'get-student', 'grade-list']);
roleRights.set(roles[2], ['logout', 'get-school', 'dashbord', 'country-list', 'get-endorsement', 'get-user-profile',
    'state-list', 'district-list', 'change-password', 'create-student-dashbord-queans',
    'create-student', 'get-student-dashbord-queans-list', 'get-student-dashbord-que', 'update-student', 'delete-student',
    'activate-student', 'get-student', 'create-report', 'update-report', 'delete-report',
    'activate-report', 'get-student', 'grade-list']);
roleRights.set(roles[3], ['logout', 'get-school', 'assign-teacher', 'dashbord', 'update-school-sub-admin', 'get-user-profile',
    'country-list', 'state-list', 'district-list', 'change-password',
    'create-teacher', 'update-teacher', 'delete-teacher', 'activate-teacher', 'get-endorsement', 'get-teacher', 'send-mail-reset-password',
    'create-student', 'get-student-dashbord-queans-list', 'get-student-dashbord-que', 'update-student', 'delete-student',
    'activate-student', 'get-student', 'create-report', 'update-report', 'delete-report',
    'activate-report', 'get-student', 'grade-list']);
module.exports = {
    roles,
    roleRights,
};
//# sourceMappingURL=role.js.map
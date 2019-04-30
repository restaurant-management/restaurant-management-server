export enum Permission {
    /**
     * Permission about *role*.
     */
    FullRolePermission = 'full-role-permission',
    GetAllRoles = 'get-all-roles',
    CreateRole = 'create-role',
    EditRole = 'edit-role',
    DeleteRole = 'delete-role',
    AddRolePermission = 'add-role-permission',
    RemoveRolePermission = 'remove-role-permission',

    /**
     * Permission about *user*.
     */
    FullUserPermission = 'full-user-permission',
    GetAllUsers = 'get-all-users',
    EditAllUsers = 'edit-all-users',
    CreateUserWithRole = 'create-user-with-role',
    DeleteUser = 'delete-user',
    EditUserRole = 'edit-user-role',
    AddUserPermission = 'add-user-permission',
    RemoveUserPermission = 'remove-user-permission',

    /**
     * Permission about *bill*.
     */
    FullBillPermission = 'full-bill-permission',
    CreateBill = 'create-bill',
    EditBill = 'edit-bill',
    UpdateBillStatus = 'update-bill-status',
    DeleteBill = 'delete-bill',

    /**
     * Permission about *dish*.
     */
    FullDishPermission = 'full-dish-permission',

    /**
     * Permission about *daily storage*.
     */
    FullDailyStoragePermission = 'full-daily-storage-permission',


}

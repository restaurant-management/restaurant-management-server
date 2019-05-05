export enum Permission {
    /**
     * Permission about *role*.
     */
    RoleManagement = 'role-management',

    /**
     * Permission about *user*.
     */
    UserManagement = 'user-management',

    /**
     * Permission about *bill*.
     */
    BillManagement = 'bill-management',
    UpdateBillStatus = 'update-bill-status',

    /**
     * Permission about *dish*.
     */
    DishManagement = 'dish-management',

    /**
     * Permission about *daily dish*.
     */
    DailyDishManagement = 'daily-dish-management',

}

export const PermissionArray = Object.keys(Permission).map(i => Permission[i]);

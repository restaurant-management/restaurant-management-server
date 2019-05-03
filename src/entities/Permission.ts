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
    CreateBill = 'create-bill',
    EditBill = 'edit-bill',
    UpdateBillStatus = 'update-bill-status',
    DeleteBill = 'delete-bill',

    /**
     * Permission about *dish*.
     */
    DishManagement = 'dish-management',

    /**
     * Permission about *daily storage*.
     */
    DailyStorageManagement = 'daily-storage-management',


}

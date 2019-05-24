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
    CreateBill = 'create-bill',
    UpdatePreparingBillStatus = 'update-preparing-bill-status',
    UpdatePrepareDoneBillStatus = 'update-prepare-done-bill-status',
    UpdateDeliveringBillStatus = 'update-delivering-bill-status',
    UpdateShippingBillStatus = 'update-shipping-bill-status',
    UpdateCompleteBillStatus = 'update-Complete-bill-status',

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

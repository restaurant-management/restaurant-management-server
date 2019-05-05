import {getConnection} from 'typeorm';
import {Permission} from '../entities/Permission';
import {Role} from '../entities/Role';
import stringToSlug from '../helpers/slugHandler';

const create = async (_name: string, _slug?: string, _description?: string, _permissions?: string[]) => {
    if(!_slug) _slug = stringToSlug(_name);

    if (await Role.findOne({where: {slug: _slug}}))
        throw new Error('Role existed.');

    let newRole = new Role();
    newRole.slug = stringToSlug(_slug);
    newRole.name = _name;
    newRole.description = _description;
    newRole.permissions = _permissions;
    return await newRole.save();
};

const update = async (_slug: string, _newSlug?: string, _name?: string, _description?: string) => {
    if (await Role.findOne({where: {slug: _newSlug}}))
        throw new Error('New role slug existed.');

    let role = await Role.findOne({where: {slug: _slug}});
    role.slug = _newSlug ? stringToSlug(_newSlug) : role.slug;
    role.name = _name || role.name;
    role.description = _description || role.description;

    return await role.save();
};

const deleteRole = async (slug: string) => {
    const result = await getConnection().createQueryBuilder()
        .delete().from(Role)
        .where('slug = :slug', {slug})
        .execute();
    if (result.affected < 1) throw new Error('Delete role failed.');
};

const findBySlug = async (slug: number) => {
    let role = await Role.findOne({where: {slug}});
    if (!role) throw new Error('Not found.');
    return role;
};

const getAll = async () => {
    return await Role.find();
};

const addPermission = async (slug: string, permission: string) => {
    if (Object.keys(Permission).map(value => Permission[value]).indexOf(permission) < 0)
        throw new Error('Permission not found.');

    let role = await Role.findOne({where: {slug}});
    if(!role.permissions) role.permissions = [];
    role.permissions.push(permission);
    const saved = await role.save();
    if (!saved) throw new Error('Add permission failed.');
    return saved;
};

const removePermission = async (slug: string, permission: string) => {
    let role = await Role.findOne({where: {slug}});
    if (!role) throw new Error('Role not found.');
    let index = role.permissions.indexOf(permission);
    if (index > -1) role.permissions.splice(index, 1);
    const saved = await role.save();
    if (!saved) throw new Error('Remove permission failed.');
    return saved;
};

export {create, getAll, deleteRole, findBySlug, update, addPermission, removePermission}

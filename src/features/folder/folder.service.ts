import { Bookmark } from "../bookmark/bookmark.model";
import { genError } from "../shared/shared";
import { IdParamsInput } from "../shared/shared.validator";
import { serviceContext } from "../types/services";
import { Folder } from "./folder.model";
import { CreateFolderInput, UpdateFolderInput } from "./folder.validator";

export const createFolderService = async ({ user, input: { name } }: serviceContext<CreateFolderInput>) => {
    const existsFolder = await Folder.findOne({ owner: user?._id, name });
    if (existsFolder) throw genError("Folder already exists. Choose differ name", 404);

    const newFolder = new Folder({ name, owner: user?._id });
    await newFolder.save();
    await newFolder.populate("owner", "username -_id");

    const folderData = { ...(newFolder.toObject()), owner: (newFolder.owner as unknown as { username: string }).username };
    // const folderData = { ...newFolder.toObject(), owner: newFolder.owner.username };

    return {
        success: true,
        message: "Folder created successfully",
        folderData
    }
};

export const readFoldersService = async ({ user }: serviceContext<unknown>) => {
    const foldersOfUser = await Folder.find({ owner: user?._id }).populate("owner", "username -_id");

    const foldersData = foldersOfUser.map(folder => ({ ...(folder.toObject()), owner: (folder.owner as unknown as { username: string }).username }));

    return {
        success: true,
        message: "Folder created successfully",
        foldersData
    }
};

export const updateFolderService = async ({ user, input: { name, id } }: serviceContext<UpdateFolderInput & IdParamsInput>) => {
    const existsFolder = await Folder.findOne({ _id: id, owner: user?._id });
    if (!existsFolder) throw genError("Folder not found.", 404);

    existsFolder.name = name;
    await existsFolder.save();
    await existsFolder.populate("owner", "username");
    const folderData = { ...existsFolder.toObject(), owner: (existsFolder.owner as unknown as { username: string }).username };

    return {
        success: true,
        message: "folder updated.",
        folderData
    }
};

export const deleteFolderService = async ({ user, input: { id } }: serviceContext<IdParamsInput>) => {
    const existsFolder = await Folder.findOne({ _id: id, owner: user?._id });
    if (!existsFolder) throw genError("Folder not found.", 404);

    await Bookmark.deleteMany({ folder: existsFolder._id, owner: user?._id });
    await existsFolder.deleteOne();

    return {
        success: true,
        message: "folder deleted.",
    }
};
import { Folder } from "../folder/folder.model";
import { genError } from "../shared/shared";
import { IdParamsInput } from "../shared/shared.validator";
import { serviceContext } from "../types/services";
import { Bookmark } from "./bookmark.model";
import { createBookmarkInput, folderQueryInput, updateBookmarkInput } from "./bookmark.validator";

export const createBookmarkService = async ({ user, input: { url, folder, title } }: serviceContext<createBookmarkInput>) => {
    const folderExists = await Folder.findOne({ _id: folder, owner: user?._id });
    if (!folderExists) throw genError("Folder not found. Enter valid folder id.", 404);

    const existBookmark = await Bookmark.findOne({ owner: user?._id, folder, $or: [{ title }, { url }] });

    if (existBookmark) {
        const titleMathces = existBookmark.title === title;
        const urlMathces = existBookmark.url === url;

        if (titleMathces && urlMathces) throw genError("Enter diffrent title and url.", 409);
        else if (titleMathces) throw genError("Enter diffrent title.", 409);
        else if (urlMathces) throw genError("Enter diffrent url.", 409);
    }

    const newBookmark = new Bookmark({ title, url, folder, owner: user?._id });
    await newBookmark.save();
    await newBookmark.populate([
        { path: "owner", select: "username -_id" },
        { path: "folder", select: "name -_id" }
    ]);

    const bookmarkData = { ...(newBookmark.toObject()), owner: (newBookmark.owner as unknown as { username: string }).username, folder: (newBookmark.folder as unknown as { name: string }).name };

    return {
        success: true,
        message: "Bookmark created successfully.",
        bookmarkData
    }
};

export const deleteBookmarkService = async ({ user, input: { id } }: serviceContext<IdParamsInput>) => {
    const bookmark = await Bookmark.findOne({ _id: id, owner: user?._id });
    if (!bookmark) throw genError("Bookmark not found. Enter valid Bookmark id.", 404);

    await bookmark.deleteOne();
    return {
        success: true,
        message: "Bookmark deleted successfully."
    }
};

export const updateBookmarkService = async ({ user, input: { id, title, url } }: serviceContext<IdParamsInput & updateBookmarkInput>) => {
    const bookmark = await Bookmark.findOne({ _id: id, owner: user?._id });
    if (!bookmark) throw genError("Bookmark not found. Enter valid Bookmark id.", 404);

    bookmark.title = title;
    bookmark.url = url;
    await bookmark.save();
    await bookmark.populate([
        { path: "owner", select: "username -_id" },
        { path: "folder", select: "name -_id" }
    ]);

    const bookmarkData = { ...(bookmark.toObject()), owner: (bookmark.owner as unknown as { username: string }).username, folder: (bookmark.folder as unknown as { name: string })?.name ?? null };

    return {
        success: true,
        message: "Bookmark updated successfully.",
        bookmarkData
    }
};

export const readBookmarksService = async ({ user, input: { folder } }: serviceContext<folderQueryInput>) => {
    let filter = { owner: user?._id };
    if (folder) Object.assign(filter, { folder: folder.toString() });

    const bookmarks = await Bookmark.find(filter).populate([
        { path: "owner", select: "username -_id" },
        { path: "folder", select: "name -_id" }
    ]);
    console.log(bookmarks);

    const bookmarksData = bookmarks.map(bookmark => ({ ...(bookmark.toObject()), owner: (bookmark.owner as unknown as { username: string }).username, folder: (bookmark.folder as unknown as { name: string })?.name ?? null }));

    return {
        success: true,
        message: "Bookmarks readed successfully.",
        bookmarksData
    }
};
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FolderDetails {
  id: number;
  folderName: string;
  folderImages: string[];
}

interface UserFolders {
  username: string;
  folders: FolderDetails[];
}

interface IFolder {
  userFolders: UserFolders[]; // Store as an array
}

const initialState: IFolder = {
  userFolders: [],
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    addFolder: (
      state,
      action: PayloadAction<{
        username: string;
        folder: Omit<FolderDetails, "folderImages">;
      }>
    ) => {
      const { username, folder } = action.payload;
      const userIndex = state.userFolders.findIndex(
        (user) => user.username === username
      );

      if (userIndex === -1) {
        // User does not exist, add new entry
        state.userFolders.push({
          username,
          folders: [{ ...folder, folderImages: [] }],
        });
      } else {
        // User exists, add folder to their list
        state.userFolders[userIndex].folders.push({
          ...folder,
          folderImages: [],
        });
      }
    },
    addImageInFolder: (
      state,
      action: PayloadAction<{
        username: string;
        folderName: string;
        image: string;
      }>
    ) => {
      const { username, folderName, image } = action.payload;
      const user = state.userFolders.find((user) => user.username === username);

      if (user) {
        const folder = user.folders.find((f) => f.folderName === folderName);
        if (folder) {
          folder.folderImages.push(image);
        }
      }
    },
    clearFolderData: (state, action: PayloadAction<{ username: string }>) => {
      state.userFolders = state.userFolders.filter(
        (user) => user.username !== action.payload.username
      );
    },
  },
});

export const { addFolder, clearFolderData, addImageInFolder } =
  folderSlice.actions;

export default folderSlice.reducer;

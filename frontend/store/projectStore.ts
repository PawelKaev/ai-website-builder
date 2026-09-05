import { create } from 'zustand';

interface ProjectState {
  currentProject: any;
  structure: any;
  designTokens: any;
  setProject: (project: any) => void;
  setStructure: (structure: any) => void;
  setDesignTokens: (tokens: any) => void;
  clearProject: () => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  currentProject: null,
  structure: null,
  designTokens: null,
  setProject: (project) => set({ currentProject: project }),
  setStructure: (structure) => set({ structure }),
  setDesignTokens: (tokens) => set({ designTokens: tokens }),
  clearProject: () => set({ currentProject: null, structure: null, designTokens: null })
}));

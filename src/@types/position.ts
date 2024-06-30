export interface IToolLanguage {
  toolLanguageResourceId: number;
  positionResourceId: number;
  name: string;
}

export interface IPosition {
  positionResourceId: number;
  name: string;
  toolLanguageResources: IToolLanguage[];
}

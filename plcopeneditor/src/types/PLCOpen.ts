export interface POU {
    '@name': string;
    body: {
      ST?: {
        '#text': string;
      };
      // Future language support can be added here
    };
    // Additional POU properties can be added here
  }
  
  export interface PLCOpenProject {
    project: {
      types: {
        pous: {
          pou: POU[];
        };
      };
    };
  }
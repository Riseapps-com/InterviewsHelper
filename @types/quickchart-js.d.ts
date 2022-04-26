declare module 'quickchart-js' {
  import type * as ChartJS from 'chart.js';

  class QuickChart {
    constructor(apiKey?: string, accountId?: string);

    public setConfig(config: ChartJS.ChartConfiguration): QuickChart;

    public setWidth(width: number): QuickChart;

    public setHeight(height: number): QuickChart;

    public setBackgroundColor(color: string): QuickChart;

    public setDevicePixelRatio(ratio: number): QuickChart;

    public setFormat(fmt: string): QuickChart;

    public getUrl(): string;

    public getShortUrl(): Promise<string>;

    public toBinary(): Promise<Buffer>;

    public toFile(pathOrDescriptor: string | number | Buffer | URL): Promise<void>;
  }

  export = QuickChart;
}

import { WallStyle, PositionXY } from "../../../types";
import WallElement from "./WallElement"

export default class Wall {
    private wallElements: Set<WallElement> = new Set();
    private style: WallStyle;
    private initialCorner: PositionXY;
    private endCorner: PositionXY;
    private doorPosition: PositionXY | null;
  
    constructor(
        style: WallStyle,
        initialCorner: PositionXY,
        endCorner: PositionXY,
        doorPosition?: PositionXY
    ) {
        this.style = style;
        this.initialCorner = initialCorner;
        this.endCorner = endCorner;
        this.doorPosition = doorPosition? doorPosition : null;
    }
  
    getStyle(): WallStyle {
      return this.style;
    }
  
    setStyle(newStyle: WallStyle): void {
      this.style = newStyle;
    }

    getDoorPosition(): PositionXY | null {
        return this.doorPosition;
    }

    setDoorPosition(doorPosition: PositionXY): void {
        this.doorPosition = doorPosition;
    }
  
    addWallElement(element: WallElement): void {
      this.wallElements.add(element);
    }
  
    removeWallElement(element: WallElement): void {
      this.wallElements.delete(element);
    }
  
    getWallElements(): WallElement[] {
      return Array.from(this.wallElements);
    }
  
    // findElement(predicate: (el: WallElement) => boolean): WallElement | undefined {
    //   return Array.from(this.wallElements).find(predicate);
    // }

    getGeometry(): void {
        console.log("Geometry wall")
    }
  }
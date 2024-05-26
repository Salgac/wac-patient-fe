/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface XsalgovicConditionDialog {
        "apiBase": string;
        "close": () => void;
        "dialogOpen": boolean;
        "patient": Patient;
    }
    interface XsalgovicPatientCard {
        "apiBase": string;
    }
    interface XsalgovicVisitDialog {
        "apiBase": string;
        "close": () => void;
        "dialogOpen": boolean;
        "patient": Patient;
        "visit": Visit;
    }
}
export interface XsalgovicConditionDialogCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLXsalgovicConditionDialogElement;
}
export interface XsalgovicVisitDialogCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLXsalgovicVisitDialogElement;
}
declare global {
    interface HTMLXsalgovicConditionDialogElementEventMap {
        "close": any;
    }
    interface HTMLXsalgovicConditionDialogElement extends Components.XsalgovicConditionDialog, HTMLStencilElement {
        addEventListener<K extends keyof HTMLXsalgovicConditionDialogElementEventMap>(type: K, listener: (this: HTMLXsalgovicConditionDialogElement, ev: XsalgovicConditionDialogCustomEvent<HTMLXsalgovicConditionDialogElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLXsalgovicConditionDialogElementEventMap>(type: K, listener: (this: HTMLXsalgovicConditionDialogElement, ev: XsalgovicConditionDialogCustomEvent<HTMLXsalgovicConditionDialogElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLXsalgovicConditionDialogElement: {
        prototype: HTMLXsalgovicConditionDialogElement;
        new (): HTMLXsalgovicConditionDialogElement;
    };
    interface HTMLXsalgovicPatientCardElement extends Components.XsalgovicPatientCard, HTMLStencilElement {
    }
    var HTMLXsalgovicPatientCardElement: {
        prototype: HTMLXsalgovicPatientCardElement;
        new (): HTMLXsalgovicPatientCardElement;
    };
    interface HTMLXsalgovicVisitDialogElementEventMap {
        "close": any;
    }
    interface HTMLXsalgovicVisitDialogElement extends Components.XsalgovicVisitDialog, HTMLStencilElement {
        addEventListener<K extends keyof HTMLXsalgovicVisitDialogElementEventMap>(type: K, listener: (this: HTMLXsalgovicVisitDialogElement, ev: XsalgovicVisitDialogCustomEvent<HTMLXsalgovicVisitDialogElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLXsalgovicVisitDialogElementEventMap>(type: K, listener: (this: HTMLXsalgovicVisitDialogElement, ev: XsalgovicVisitDialogCustomEvent<HTMLXsalgovicVisitDialogElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLXsalgovicVisitDialogElement: {
        prototype: HTMLXsalgovicVisitDialogElement;
        new (): HTMLXsalgovicVisitDialogElement;
    };
    interface HTMLElementTagNameMap {
        "xsalgovic-condition-dialog": HTMLXsalgovicConditionDialogElement;
        "xsalgovic-patient-card": HTMLXsalgovicPatientCardElement;
        "xsalgovic-visit-dialog": HTMLXsalgovicVisitDialogElement;
    }
}
declare namespace LocalJSX {
    interface XsalgovicConditionDialog {
        "apiBase"?: string;
        "close"?: () => void;
        "dialogOpen"?: boolean;
        "onClose"?: (event: XsalgovicConditionDialogCustomEvent<any>) => void;
        "patient"?: Patient;
    }
    interface XsalgovicPatientCard {
        "apiBase"?: string;
    }
    interface XsalgovicVisitDialog {
        "apiBase"?: string;
        "close"?: () => void;
        "dialogOpen"?: boolean;
        "onClose"?: (event: XsalgovicVisitDialogCustomEvent<any>) => void;
        "patient"?: Patient;
        "visit"?: Visit;
    }
    interface IntrinsicElements {
        "xsalgovic-condition-dialog": XsalgovicConditionDialog;
        "xsalgovic-patient-card": XsalgovicPatientCard;
        "xsalgovic-visit-dialog": XsalgovicVisitDialog;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "xsalgovic-condition-dialog": LocalJSX.XsalgovicConditionDialog & JSXBase.HTMLAttributes<HTMLXsalgovicConditionDialogElement>;
            "xsalgovic-patient-card": LocalJSX.XsalgovicPatientCard & JSXBase.HTMLAttributes<HTMLXsalgovicPatientCardElement>;
            "xsalgovic-visit-dialog": LocalJSX.XsalgovicVisitDialog & JSXBase.HTMLAttributes<HTMLXsalgovicVisitDialogElement>;
        }
    }
}

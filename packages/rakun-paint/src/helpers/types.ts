
interface EventTargetExtended extends EventTarget {
  value: string | number | null | undefined;
}

export interface HTMLElementEvent extends Event {
  target: EventTargetExtended;
}

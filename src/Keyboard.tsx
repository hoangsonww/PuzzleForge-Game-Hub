import { CornerDownLeft, Delete } from "lucide-react";

type KeyboardProps = {
  target: string;
  onKeyPress: (letter: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
  guesses: string[];
};

/**
 * Keyboard component displays a keyboard with letters and special keys.
 * It allows the user to input letters, enter a guess, and delete letters.
 * The keyboard is responsive and adjusts its layout based on the screen size.
 */
export default function Keyboard({
  target,
  onKeyPress,
  onEnter,
  onBackspace,
  guesses,
}: KeyboardProps) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex flex-row gap-2">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((letter) => (
          <KeyboardKey
            key={letter}
            target={target}
            letter={letter}
            onKeyPress={() => onKeyPress(letter)}
            guesses={guesses}
          />
        ))}
      </div>
      <div className="flex flex-row gap-2">
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((letter) => (
          <KeyboardKey
            key={letter}
            target={target}
            letter={letter}
            onKeyPress={() => onKeyPress(letter)}
            guesses={guesses}
          />
        ))}
      </div>
      <div className="flex flex-row gap-2">
        <EnterKey onEnter={onEnter} />
        {["Z", "X", "C", "V", "B", "N", "M"].map((letter) => (
          <KeyboardKey
            key={letter}
            target={target}
            letter={letter}
            onKeyPress={() => onKeyPress(letter)}
            guesses={guesses}
          />
        ))}
        <BackspaceKey onBackspace={onBackspace} />
      </div>
    </div>
  );
}

/** State to handle if a key should show as disabled (dark grey), correct (green), or default. */
export enum KeyboardKeyState {
  Default,
  Disabled,
  Correct,
}

/**
 * Function that generates the classes for a keyboard key based on its state.
 *
 * @param state - The state of the keyboard key (Default, Disabled, Correct).
 * @returns - The classes for the keyboard key based on its state.
 */
const colorForKey = (state: KeyboardKeyState) => {
  switch (state) {
    case KeyboardKeyState.Default:
      return "text-black bg-slate-300";
    case KeyboardKeyState.Disabled:
      return "text-white bg-slate-500";
    case KeyboardKeyState.Correct:
      return "text-white bg-lime-600";
  }
};

/** Component to encapsulate the functionality for a single keyboard key. */
type KeyboardKeyProps = {
  target: string;
  letter: string;
  onKeyPress: () => void;
  guesses: string[];
};

/**
 * KeyboardKey component represents a single key on the keyboard.
 * It displays the letter and its state (disabled, correct, or default).
 * The key can be clicked to input a letter.
 *
 * @param target - The target word to guess.
 * @param letter - The letter on the keyboard key.
 * @param onKeyPress - Function to handle key press event.
 * @param guesses - Array of previous guesses.
 */
export function KeyboardKey({
  target,
  letter,
  onKeyPress,
  guesses,
}: KeyboardKeyProps) {
  const state = stateForKeyboardKey(target, guesses)(letter);
  return (
    <div
      className={`w-7 sm:w-11 h-14 rounded-lg flex items-center justify-center text-2xl font-bold ${colorForKey(
        state,
      )}`}
      onClick={onKeyPress}
    >
      {letter}
    </div>
  );
}

/** Component to encapsulate the enter key. */
type EnterKeyProps = { onEnter: () => void };

/**
 * EnterKey component represents the enter key on the keyboard.
 * It can be clicked to submit a guess.
 *
 * @param onEnter - Function to handle enter key press event.
 */
export function EnterKey({ onEnter }: EnterKeyProps) {
  return (
    <>
      <div
        className={`hidden sm:w-16 h-14 rounded-lg sm:flex items-center justify-center text-sm font-bold text-slate-900 bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/40 ring-1 ring-white/40 transition-all cursor-pointer hover:from-amber-300 hover:to-orange-400 hover:-translate-y-0.5 active:translate-y-0 active:scale-95`}
        onClick={onEnter}
      >
        ENTER
      </div>
      <div
        className={`flex w-8 h-14 rounded-lg sm:hidden items-center justify-center text-sm font-bold text-slate-900 bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/40 ring-1 ring-white/40 transition-all cursor-pointer hover:from-amber-300 hover:to-orange-400 hover:-translate-y-0.5 active:translate-y-0 active:scale-95`}
        onClick={onEnter}
      >
        <CornerDownLeft />
      </div>
    </>
  );
}

/** Component to encapsulate the backspace key. */
type BackspaceKeyProps = { onBackspace: () => void };

/**
 * BackspaceKey component represents the backspace key on the keyboard.
 * It can be clicked to delete the last letter entered.
 *
 * @param onBackspace - Function to handle backspace key press event.
 */
export function BackspaceKey({ onBackspace }: BackspaceKeyProps) {
  return (
    <div
      className={`w-8 sm:w-16 h-14 rounded-lg flex items-center justify-center text-sm font-bold text-black bg-slate-300`}
      onClick={onBackspace}
    >
      <Delete />
    </div>
  );
}

/**
 * Function to determine the state of a keyboard key based on the target word and previous guesses.
 *
 * @param target - The target word to guess.
 * @param guesses - Array of previous guesses.
 * @returns - A function that takes a letter and returns its state (Disabled, Correct, Default).
 */
function stateForKeyboardKey(target: string, guesses: string[]) {
  const correctLetters = new Set<string>();
  const disabledLetters = new Set<string>();

  for (let guess of guesses) {
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      if (target[i] === letter) {
        correctLetters.add(letter);
      } else if (!target.includes(letter)) {
        disabledLetters.add(letter);
      }
    }
  }

  return (letter: string) => {
    if (correctLetters.has(letter)) {
      return KeyboardKeyState.Correct;
    } else if (disabledLetters.has(letter)) {
      return KeyboardKeyState.Disabled;
    } else {
      return KeyboardKeyState.Default;
    }
  };
}

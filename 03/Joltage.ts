import { Array, Context, Schema, Effect, Layer, Order } from "effect";

class EmptyStringError extends Schema.TaggedError<EmptyStringError>()(
  "EmptyStringError",
  {
    field: Schema.String,
    message: Schema.String,
  },
) {}

const highest = (
  acc: string,
  bank: string,
  totalDigits: number,
): Effect.Effect<string, EmptyStringError> => {
  if (totalDigits <= 0) {
    return Effect.succeed(acc);
  }

  return Array.match(bank.slice(0, bank.length - totalDigits + 1).split(""), {
    onEmpty: () =>
      Effect.fail(
        new EmptyStringError({
          field: "bank",
          message: "Empty string provided",
        }),
      ),
    onNonEmpty: (chars) =>
      Effect.gen(function* () {
        const [char, index] = Array.max(
          Array.map(chars, (char, i) => [char, i] as const),
          Order.combine(
            Order.mapInput(Order.string, ([char]) => char),
            Order.mapInput(Order.number, ([_, i]) => -i),
          ),
        );

        return yield* highest(
          acc + char,
          bank.slice(index + 1),
          totalDigits - 1,
        );
      }),
  });
};

export class Joltage extends Context.Tag("03/Joltage")<
  Joltage,
  {
    readonly highest: (
      acc: string,
      bank: string,
      totalDigits: number,
    ) => Effect.Effect<string, EmptyStringError>;
  }
>() {
  static readonly layer = Layer.succeed(Joltage, { highest });
}

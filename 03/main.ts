import { FileSystem } from "@effect/platform";
import { BunFileSystem, BunRuntime } from "@effect/platform-bun";
import { Effect, Layer, Stream } from "effect";
import { Joltage } from "./Joltage";

const part = process.argv.includes("--part=2") ? 2 : 1;

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const joltage = yield* Joltage;

  const lines = yield* fs.stream(`${import.meta.dirname}/input.txt`).pipe(
    Stream.decodeText(),
    Stream.splitLines,
    Stream.mapEffect((bank) => joltage.highest("", bank, part === 1 ? 2 : 12)),
    Stream.mapEffect((highestStr) => Effect.succeed(parseInt(highestStr))),
    Stream.runSum,
  );

  yield* Effect.log(lines);
});

BunRuntime.runMain(
  program.pipe(Effect.provide(Layer.merge(BunFileSystem.layer, Joltage.layer))),
);

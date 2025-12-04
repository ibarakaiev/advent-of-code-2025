import { NodeFileSystem, NodeRuntime } from "@effect/platform-node";
import { Effect } from "effect";
import { FileSystem } from "@effect/platform";
import { Stream } from "effect";

const program = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;

  const lines = yield* fs
    .stream(`${import.meta.dirname}/input.txt`)
    .pipe(Stream.decodeText(), Stream.splitLines, Stream.runCollect);

  yield* Effect.log(lines);
});

NodeRuntime.runMain(program.pipe(Effect.provide(NodeFileSystem.layer)));

export async function resolve(specifier, context, nextResolve) {
  if (specifier === 'livekit-server-sdk') return { url: new URL('./avatar-sdk.mjs', import.meta.url).href, shortCircuit: true };
  return nextResolve(specifier, context);
}

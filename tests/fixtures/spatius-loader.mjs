export async function resolve(specifier, context, nextResolve) {
  if (specifier === '@spatius/avatarkit') return { url: new URL('./spatius-sdk.mjs', import.meta.url).href, shortCircuit: true };
  return nextResolve(specifier, context);
}

const privateResolver = resolverFunction => async (parent, args, ctx, info) => {
  if (!ctx.req.user) throw new Error('No JWT provided')

  const resolved = await resolverFunction(parent, args, ctx, info)
  return resolved
}

export default privateResolver

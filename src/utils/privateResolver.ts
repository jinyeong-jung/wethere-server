const privateResolver = resolverFunction => async (
  parent,
  args,
  context,
  info
) => {
  if (!context.req.user) {
    throw new Error("JWT가 존재하지 않습니다.");
  }
  const resolved = await resolverFunction(parent, args, context, info);
  return resolved;
};

export default privateResolver;

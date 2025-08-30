class Constants {
  constract(params: {
    pubilc iconCategories: IconCategories,
    pubilc appIcon?: AppIcon,
  }){}

  static initialize(): Constants{
    return new Constants(
      iconCategories: IconCategories.fromEmpty(),
      appIcon: AppIcon
    )
  }

}

export AppConstants = Constants.initialize()
export class Parser {
  public static parseEnum<T>(value: string, enumType: T): T[keyof T] | undefined {
    if (!value) {
      return undefined;
    }

    for (const property in enumType) {
      const enumMember = enumType[property];
      if (typeof enumMember === 'string') {
        if (enumMember.toUpperCase() === value.toUpperCase()) {
          const key = (enumMember as string) as keyof typeof enumType;
          return enumType[key];
        }
      }
    }
    return undefined;
  }
}

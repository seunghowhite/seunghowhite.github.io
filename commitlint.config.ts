module.exports = {
  parserPreset: "conventional-changelog-conventionalcommits",
  rules: {
    // 본문 바로 위에 공백을 갖도록 강제합니다.
    "body-leading-blank": [1, "always"],
    // 본문의 최대 길이를 100자로 제한합니다.
    "body-max-line-length": [2, "always", 100],
    // 푸터 바로 위에 공백을 갖도록 강제합니다.
    "footer-leading-blank": [1, "always"],
    // 푸터의 최대 길이를 100자로 제한합니다.
    "footer-max-line-length": [2, "always", 100],
    // 헤더(제목)의 최대 길이를 100자로 제한합니다.
    "header-max-length": [2, "always", 100],
    // 제목의 대문자 사용을 허용하지 않습니다.
    "subject-case": [2, "never", ["sentence-case", "start-case", "pascal-case", "upper-case"]],
    // 제목이 비어있지 않도록 강제합니다.
    "subject-empty": [2, "never"],
    // 제목 끝에 마침표를 사용하지 않도록 강제합니다.
    "subject-full-stop": [2, "never", "."],
    // 타입(카테고리)은 소문자로만 허용합니다.
    "type-case": [2, "always", "lower-case"],
    // 타입(카테고리)이 비어있지 않도록 강제합니다.
    "type-empty": [2, "never"],
    // 허용된 타입(카테고리)만 사용할 수 있도록 강제합니다.
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "package",
        "fix",
        "design",
        "style",
        "refactor",
        "comment",
        "docs",
        "test",
        "chore",
        "rename",
        "remove",
        "hotfix",
        "merge",
      ],
    ],
  },
};

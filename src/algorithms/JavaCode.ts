

export const json_string = `
{
    "code": [
    "for (int i = 0, st=0; i < T.length(); i++) {",
    "while (st > 0 && P.charAt(st) != T.charAt(i))",
    "st = fail[st - 1];",
    "if (P.charAt(st) == T.charAt(i))",
    "st++;",
    "if (st == P.length()) {",
    "matches.add(i - P.length() + 1);",
    "st = fail[st - 1];",
    "}",
    "}"
],

  "indent": [
    0,
    1,
    2,
    1,
    2,
    1,
    2,
    2,
    1,
    0
]
}
`
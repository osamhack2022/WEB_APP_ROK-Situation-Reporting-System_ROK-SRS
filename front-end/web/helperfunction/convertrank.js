export function Convertrank(val) {
    const rank = new Map()

    rank["PVT"] = "이병"
    rank["PFC"] = "일병"
    rank["CPL"] = "상병"
    rank["SGT"] = "병장"
    rank["SST"] = "하사"
    rank["SFC"] = "중사"
    rank["MST"] = "상사"
    rank["SGM"] = "원사"
    rank["SEC"] = "소위"
    rank["LIU"] = "중위"
    rank["CPT"] = "대위"
    rank["MAJ"] = "소령"
    rank["LTC"] = "중령"
    rank["COL"] = "대령"
    rank["BG"] = "준장"
    rank["MG"] = "소장"
    rank["LG"] = "중장"
    rank["GEN"] = "대장"
    return rank[val]


}
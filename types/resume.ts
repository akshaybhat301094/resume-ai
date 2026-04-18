export type BulletRewrite = {
    original: string
    improved: string
    reason: string
}

export type MissingSection = {
    section: string
    reason: string
}

export type Analysis = {
    ats_score: number
    ats_reasoning: string
    missing_sections: MissingSection[]
    bullet_rewrites: BulletRewrite[]
    top_strengths: string[]
    quick_wins: string[]
}

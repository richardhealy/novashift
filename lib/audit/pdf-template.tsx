import {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Font,
} from "@react-pdf/renderer"

// Note: Font registration would need actual font files
// For now, using system fonts

const styles = StyleSheet.create({
	page: {
		padding: 40,
		fontFamily: "Helvetica",
	},
	header: {
		marginBottom: 30,
		borderBottom: "2 solid #0c59d3",
		paddingBottom: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#0f172a",
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		color: "#4b5563",
	},
	section: {
		marginBottom: 25,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#0f172a",
		marginBottom: 12,
	},
	sectionText: {
		fontSize: 11,
		color: "#1f2937",
		lineHeight: 1.6,
		marginBottom: 10,
	},
	scoreBox: {
		backgroundColor: "#f0f9ff",
		padding: 20,
		borderRadius: 8,
		marginBottom: 20,
		textAlign: "center",
	},
	scoreNumber: {
		fontSize: 48,
		fontWeight: "bold",
		color: "#0c59d3",
		marginBottom: 5,
	},
	scoreLabel: {
		fontSize: 14,
		color: "#4b5563",
	},
	opportunityItem: {
		marginBottom: 15,
		paddingLeft: 10,
		borderLeft: "3 solid #0c59d3",
	},
	opportunityTitle: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#0f172a",
		marginBottom: 5,
	},
	opportunityText: {
		fontSize: 10,
		color: "#4b5563",
		lineHeight: 1.5,
	},
	quickWinBox: {
		backgroundColor: "#f0fdf4",
		padding: 12,
		borderRadius: 6,
		marginBottom: 10,
		border: "1 solid #86efac",
	},
	longTermBox: {
		backgroundColor: "#eff6ff",
		padding: 12,
		borderRadius: 6,
		marginBottom: 10,
		border: "1 solid #93c5fd",
	},
	projectHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 5,
	},
	projectTitle: {
		fontSize: 12,
		fontWeight: "bold",
		color: "#0f172a",
	},
	timeframe: {
		fontSize: 10,
		color: "#6b7280",
	},
	ctaBox: {
		backgroundColor: "#0f172a",
		color: "#ffffff",
		padding: 20,
		borderRadius: 8,
		textAlign: "center",
		marginTop: 20,
	},
	ctaText: {
		fontSize: 12,
		color: "#ffffff",
		marginBottom: 10,
	},
	footer: {
		position: "absolute",
		bottom: 30,
		left: 40,
		right: 40,
		textAlign: "center",
		fontSize: 9,
		color: "#9ca3af",
	},
})

interface PDFTemplateProps {
	reportData: {
		readinessScore: number
		scoreExplanation: string
		businessSummary?: string
		industryLandscape: string
		aiOpportunities: Array<{ title: string; description: string }>
		quickWins: Array<{ title: string; description: string; timeframe: string }>
		longTermProjects: Array<{
			title: string
			description: string
			timeframe: string
		}>
		roiSnapshot?: { estimatedSavings: string; hoursSaved: number }
		cta: string
	}
	scores: {
		totalScore: number
		tier: string
	}
}

export function PDFTemplate({ reportData, scores }: PDFTemplateProps) {
	return (
		<Document>
			<Page size='A4' style={styles.page}>
				<View style={styles.header}>
					<Text style={styles.title}>AI Readiness Report</Text>
					<Text style={styles.subtitle}>NovaShift — AI & Automation Consulting</Text>
				</View>

				{/* Score Display */}
				<View style={styles.scoreBox}>
					<Text style={styles.scoreNumber}>{scores.totalScore}</Text>
					<Text style={styles.scoreLabel}>AI Readiness Score</Text>
					<Text style={[styles.sectionText, { textAlign: "center", marginTop: 5 }]}>
						{scores.tier === "not-ready"
							? "Not Ready (0-39)"
							: scores.tier === "moderate"
								? "Moderately Ready (40-69)"
								: scores.tier === "strong"
									? "Strong Foundation (70-84)"
									: "High Readiness (85-100)"}
					</Text>
				</View>

				{/* Score Explanation */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>What This Score Means</Text>
					<Text style={styles.sectionText}>{reportData.scoreExplanation}</Text>
				</View>

				{/* Business Summary */}
				{reportData.businessSummary && (
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>About Your Business</Text>
						<Text style={styles.sectionText}>{reportData.businessSummary}</Text>
					</View>
				)}

				{/* Industry Landscape */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>AI Landscape in Your Industry</Text>
					<Text style={styles.sectionText}>{reportData.industryLandscape}</Text>
				</View>

				{/* AI Opportunities */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Key AI Opportunities</Text>
					{reportData.aiOpportunities.map((opp, idx) => (
						<View key={idx} style={styles.opportunityItem}>
							<Text style={styles.opportunityTitle}>{opp.title}</Text>
							<Text style={styles.opportunityText}>{opp.description}</Text>
						</View>
					))}
				</View>

				{/* Quick Wins */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Quick Wins (0-3 months)</Text>
					{reportData.quickWins.map((win, idx) => (
						<View key={idx} style={styles.quickWinBox}>
							<View style={styles.projectHeader}>
								<Text style={styles.projectTitle}>{win.title}</Text>
								<Text style={styles.timeframe}>{win.timeframe}</Text>
							</View>
							<Text style={styles.opportunityText}>{win.description}</Text>
						</View>
					))}
				</View>

				{/* Long-Term Projects */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Long-Term Projects (3-12 months)</Text>
					{reportData.longTermProjects.map((project, idx) => (
						<View key={idx} style={styles.longTermBox}>
							<View style={styles.projectHeader}>
								<Text style={styles.projectTitle}>{project.title}</Text>
								<Text style={styles.timeframe}>{project.timeframe}</Text>
							</View>
							<Text style={styles.opportunityText}>{project.description}</Text>
						</View>
					))}
				</View>

				{/* ROI Snapshot */}
				{reportData.roiSnapshot && (
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>ROI Snapshot</Text>
						<Text style={styles.sectionText}>
							Estimated annual savings: {reportData.roiSnapshot.estimatedSavings}
						</Text>
						<Text style={styles.sectionText}>
							Based on {reportData.roiSnapshot.hoursSaved} hours saved per week
						</Text>
					</View>
				)}

				{/* CTA */}
				<View style={styles.ctaBox}>
					<Text style={styles.ctaText}>{reportData.cta}</Text>
					<Text style={[styles.ctaText, { fontSize: 10 }]}>
						Visit novashift.ai or contact hello@novashift.ai
					</Text>
				</View>

				<Text style={styles.footer}>
					Generated by NovaShift AI Readiness Audit Tool — {new Date().toLocaleDateString()}
				</Text>
			</Page>
		</Document>
	)
}





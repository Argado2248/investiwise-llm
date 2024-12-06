import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  subheading: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  score: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  metric: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
});

export const EvaluationPDF = ({ data, formData }: { data: any; formData: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Startup Utvärderingsrapport</Text>
      
      <View style={styles.section}>
        <Text style={styles.heading}>Företagsinformation</Text>
        <Text style={styles.text}>Företag: {formData.companyName}</Text>
        <Text style={styles.text}>Bransch: {formData.industry}</Text>
        <Text style={styles.text}>Finansieringsfas: {formData.fundingStage}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Total Utvärderingspoäng</Text>
        <Text style={styles.score}>{data.score}/100</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Detaljerad Analys</Text>
        {data.metrics.map((metric: any, index: number) => (
          <View key={index} style={styles.metric}>
            <Text style={styles.subheading}>{metric.category}</Text>
            <Text style={styles.text}>Poäng: {metric.score}/100</Text>
            <Text style={styles.text}>Riktmärke: {metric.benchmark}</Text>
            <Text style={styles.text}>Påverkan: {metric.impact}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Rekommendation</Text>
        <Text style={styles.text}>{data.recommendation}</Text>
      </View>

      <Text style={styles.text}>
        Genererad: {new Date().toLocaleDateString()}
      </Text>
    </Page>
  </Document>
);
Alexander Köhler, Benedict Kruse, Nico Gensheimer, Luca Gauß, Dominik Klar
#Corona Flugverkehr
Dokumentation des Projektes 'Corona Flugverkehr' zum Thema ‘Social Distancing’ das im Rahmen
des Kurses 'Grundlagen der Datenvisualisierung' bei Herrn Prof. Dr. Till Nagel im 
Sommersemester 2020 an der Hochschule Mannheim stattgefunden hat.

Die Corona Pandemie hat durch die Corona-Verordnung zum Social Distancing und weiteren Einschränkungen geführt.
Im Projekt *Corona Flugverkehr* wird untersucht, welche Auswirkungen die Corona-Einschränkungen auf den weltweiten
Flugverkehr haben und wie diese im Verhältnis der positiv auf Corona getestet Personen stehen.
Die Daten des Flugverkehrs waren im Rahmen der Forschung frei zugänglich; die Zahlen der positiv auf Corona
getesteten Personen werden von der *World Healty Organisation* (WHO) bereitgestellt. Es konnte festgestellt
werden, dass die Zahlen der positiv getesteten Personen im Zusammenhang mit dem Einbruch des globalen Flugverkehrs stehen.

#Einführung / Konzept
##Einführung
Dieses Projekt ist im Rahmen der Vorlesung 'Grundlagen der Datenvisualisierung' entstanden. Die Vorgabe war Daten 
die im Kontext von Social Distancing stehen auszuwählen, aufzubereiten, sie zu analysieren und schließlich mit einer 
interaktiven Visualisierung sichtbar zu machen.
Nach einer gemeinsamen Recherche, sind wir auf den Flugverkehr gekommen, der durch die Reisebeschränkungen stark
betroffen ist. Deshalb haben wir uns den Verlauf des Flugverkehrs genauer angesehen.

##Konzept
Zu Beginn planten wir ein interaktives Dashboard, das wir auf einer Website bereitstellen. Nach einer Recherche über
mögliche Visualisierungen entschieden wir uns für eine radiale Heatmap, die den Flugverkehr im Vergleich zum Vorjahr
darstellen soll. Und zwei Liniendiagramme, die den Flugverkehr und die Corona Fälle im Detail über den zeitlichen Verlauf
darstellen sollen. \
Diese Visualisierung sollte dabei folgende Frage zu beantworten:

######*Wie haben sich die Einschränkungen des SARS-CoV-2-Virus auf den weltweiten Flugverkehr ausgewirkt?*

Für die Umsetzung des Dashboards entschieden wir uns für *D3*, eine JavaScript Library zum erstellen von Visualisierungen. Darüber 
Hinaus entschieden wir uns für das Front-End Framework *Vue*.

#Daten
Unsere Datenquellen waren die Flugdaten des OpenSky Networks und die Coronadaten des Robert Koch-Instituts. Das OpenSky Network ist ein Unternehmen in der Schweiz, die Flugdaten aufzeichnen. Die Flugdaten werden durch ca. 1000 Sensoren aufgezeichnet, die Weltweit verstreut sind. Die meisten dieser 1000 Sensoren befinden sich in Europa und USA. Das Robert Koch-Institut ist eine deutsche Bundesbehörde, die sich mit Infektionskrankheiten und nicht übertragbaren Krankheiten beschäftigt. Damit wir auf unserer Website auf die Daten zugreifen können, haben wir uns dazu entschieden, die Daten in ein JSON zu exportieren. Da jedoch viele Daten für uns unbrauchbar waren, mussten wir zunächst die Datensätze bereinigen und haben danach die für uns relevanten Daten zusammen mit den Coronadaten des Robert Koch-Instituts in ein JSON importiert. [[Screenshot vom JSON]]

#Auswertung
Die Flugdaten des OpenSky Networks fasst über 20 Billionen Datensätze, durch die wir uns erstmal durcharbeiten mussten. Schnell konnte man sehen, wie stark die Flugzahlen in den letzten Wochen und Monaten abgenommen haben. Auf unseren Visualisierungen konnte man klar erkennen, dass die Flugzahlen zeitgleich mit dem Anstieg der Coronafälle stark gefallen sind. [[Visualisierung]] Zusätzlich haben wir die Flugdaten von diesem Jahr mit den Flugdaten vom letzten Jahr vergleichen, damit wir sicherstellen können, dass die Einbrüche der Flugzahlen mit dem Anstieg der Coronafälle zusammen hängen. [[Visualisierung]]

#Prozess


#Prototyp / Ergebnisse
- Visualisierung: Vorstellung des Prototypens. Beschreiben Sie die eingesetzten Visualisierungs- und Interaktionstechniken. Begründen Sie die Wahl (siehe unten).
- Implementierung: Wie haben Sie die Visualisierung umgesetzt? Welche Tools haben Sie für welche Schritte eingesetzt? Wieso?

#Erkenntnisse

- Was haben Sie herausgefunden? Können Sie ein/zwei Aussagen oder Stories hervorheben? Nutzen Sie hierzu Abbildungen, die Visualisierungen realer Daten zeigen, sei es aus der EDA-Phase oder mit Hilfe des finalen Prototypens.
- Verknüpfen Sie diese mit Ihren Fragen / Hypothesen.

#Fazit
Reflexion: Haben Sie erreicht, was sie wollten? Ist Ihr Ergebnis hilfreich?
- Ausblick: Welche weiteren Ideen haben Sie? Was könnten interessante nächste Schritte sein?

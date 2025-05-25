document.addEventListener('DOMContentLoaded', function() {
    const emissionsSlider = document.getElementById('emissionsSlider');
    const sliderValueSpan = document.getElementById('sliderValue');

    // Economic Impacts
    const gdpChangeSpan = document.getElementById('gdpChange');
    const adaptationCostsSpan = document.getElementById('adaptationCosts');
    const agricultureOutputSpan = document.getElementById('agricultureOutput');
    const energyPricesSpan = document.getElementById('energyPrices');
    const jobsCreatedSpan = document.getElementById('jobsCreated');
    const investmentInfluxSpan = document.getElementById('investmentInflux');

    // Social Impacts
    const heatMortalitySpan = document.getElementById('heatMortality');
    const displacedPopulationSpan = document.getElementById('displacedPopulation');
    const socialStabilitySpan = document.getElementById('socialStability');
    const povertyReductionSpan = document.getElementById('povertyReduction');
    const cleanEnergyAccessSpan = document.getElementById('cleanEnergyAccess');
    const communityEngagementSpan = document.getElementById('communityEngagement');

    // Environmental Impacts
    const tempIncreaseSpan = document.getElementById('tempIncrease');
    const seaLevelRiseSpan = document.getElementById('seaLevelRise');
    const extremeEventsSpan = document.getElementById('extremeEvents');
    const biodiversitySpan = document.getElementById('biodiversity'); // Note: ID is 'biodiversity' in HTML, not 'biodiversityLoss'
    const waterAvailabilitySpan = document.getElementById('waterAvailability');
    const biodiversityLossSpan = document.getElementById('biodiversityLoss'); // Corrected ID usage
    const renewableEnergyAdoptionSpan = document.getElementById('renewableEnergyAdoption');

    const mapDescription = document.getElementById('mapDescription');

    // Graph bars and Gauges (ensure these IDs exist in HTML)
    const jobsGraph = document.getElementById('jobsGraph'); // Corrected ID to match HTML
    const investmentGraph = document.getElementById('investmentGraph'); // Corrected ID to match HTML
    const heatGauge = document.getElementById('heatGauge');
    const povertyGauge = document.getElementById('povertyGauge');
    const energyGauge = document.getElementById('energyGauge');
    const communityGauge = document.getElementById('communityGauge');
    const biodiversityGauge = document.getElementById('biodiversityGauge');
    const renewableGauge = document.getElementById('renewableGauge');

    // Thermometer elements
    const tempThermometerFill = document.getElementById('tempThermometerFill');
    const thermometerBulb = document.querySelector('.thermometer-bulb');


    // Tipping Point Banners
    const tippingPointWarning = document.getElementById('tippingPointWarning');
    const tippingPointPositive = document.getElementById('tippingPointPositive');

    // Chart.js Charts
    let gdpChartInstance;
    // tempChartInstance is no longer needed as we're using a custom thermometer

    // --- Comprehensive Synthetic Data Points ---
    // Values are for emissions change from -100% to +50%
    // The keys are the emissions percentage.
    const carbonImpactsDataPoints = {
        "-100": { // Extreme reduction
            gdpChange: 5.0, jobsCreated: 150000, investmentInflux: 5.0, adaptationCosts: 1.0, agricultureOutput: 10.0, energyPrices: -20.0,
            heatMortality: 0, displacedPopulation: 0, socialStability: 95, povertyReduction: 30, cleanEnergyAccess: 95, communityEngagement: 90,
            tempIncrease: 0.2, seaLevelRise: 0.0, extremeEvents: -10.0, biodiversity: 1.0, waterAvailability: 5.0, biodiversityLoss: 1.0, renewableEnergyAdoption: 99.0
        },
        "-75": { // Significant reduction
            gdpChange: 4.0, jobsCreated: 100000, investmentInflux: 3.0, adaptationCosts: 2.0, agricultureOutput: 8.0, energyPrices: -15.0,
            heatMortality: 1, displacedPopulation: 500, socialStability: 85, povertyReduction: 25, cleanEnergyAccess: 90, communityEngagement: 85,
            tempIncrease: 0.4, seaLevelRise: 0.5, extremeEvents: -5.0, biodiversity: 2.0, waterAvailability: 4.0, biodiversityLoss: 2.0, renewableEnergyAdoption: 95.0
        },
        "-50": { // Moderate reduction
            gdpChange: 3.0, jobsCreated: 75000, investmentInflux: 2.0, adaptationCosts: 3.0, agricultureOutput: 6.0, energyPrices: -10.0,
            heatMortality: 3, displacedPopulation: 1000, socialStability: 75, povertyReduction: 20, cleanEnergyAccess: 85, communityEngagement: 80,
            tempIncrease: 0.6, seaLevelRise: 1.0, extremeEvents: 0.0, biodiversity: 3.0, waterAvailability: 3.0, biodiversityLoss: 3.0, renewableEnergyAdoption: 90.0
        },
        "-25": { // Slight reduction
            gdpChange: 2.0, jobsCreated: 50000, investmentInflux: 1.0, adaptationCosts: 4.0, agricultureOutput: 4.0, energyPrices: -5.0,
            heatMortality: 5, displacedPopulation: 2000, socialStability: 65, povertyReduction: 15, cleanEnergyAccess: 80, communityEngagement: 70,
            tempIncrease: 0.8, seaLevelRise: 1.5, extremeEvents: 5.0, biodiversity: 5.0, waterAvailability: 2.0, biodiversityLoss: 5.0, renewableEnergyAdoption: 80.0
        },
        "0": { // Current levels (baseline)
            gdpChange: 0.0, jobsCreated: 0, investmentInflux: 0.0, adaptationCosts: 5.0, agricultureOutput: 0.0, energyPrices: 0.0,
            heatMortality: 10, displacedPopulation: 5000, socialStability: 50, povertyReduction: 0, cleanEnergyAccess: 50, communityEngagement: 50,
            tempIncrease: 1.5, seaLevelRise: 2.0, extremeEvents: 10.0, biodiversity: 10.0, waterAvailability: 0.0, biodiversityLoss: 10.0, renewableEnergyAdoption: 50.0
        },
        "25": { // Moderate increase
            gdpChange: -1.0, jobsCreated: -20000, investmentInflux: -0.5, adaptationCosts: 7.0, agricultureOutput: -5.0, energyPrices: 5.0,
            heatMortality: 20, displacedPopulation: 10000, socialStability: 40, povertyReduction: -5, cleanEnergyAccess: 30, communityEngagement: 40,
            tempIncrease: 2.0, seaLevelRise: 3.0, extremeEvents: 15.0, biodiversity: 15.0, waterAvailability: -5.0, biodiversityLoss: 15.0, renewableEnergyAdoption: 30.0
        },
        "50": { // High increase
            gdpChange: -3.0, jobsCreated: -100000, investmentInflux: -2.0, adaptationCosts: 10.0, agricultureOutput: -10.0, energyPrices: 10.0,
            heatMortality: 40, displacedPopulation: 25000, socialStability: 25, povertyReduction: -10, cleanEnergyAccess: 10, communityEngagement: 20,
            tempIncrease: 2.5, seaLevelRise: 4.5, extremeEvents: 25.0, biodiversity: 25.0, waterAvailability: -10.0, biodiversityLoss: 25.0, renewableEnergyAdoption: 10.0
        }
    };

    // Helper for linear interpolation
    function lerp(a, b, t) {
        return a + t * (b - a);
    }

    // Function to get interpolated data based on emissions slider value
    function getInterpolatedImpacts(emissions) {
        const keys = Object.keys(carbonImpactsDataPoints).map(Number).sort((a, b) => a - b);
        let lowerBound = keys[0];
        let upperBound = keys[keys.length - 1];

        for (let i = 0; i < keys.length; i++) {
            if (emissions >= keys[i]) {
                lowerBound = keys[i];
            }
            if (emissions <= keys[i]) {
                upperBound = keys[i];
                break;
            }
        }

        if (lowerBound === upperBound) {
            return carbonImpactsDataPoints[lowerBound];
        }

        const lowerData = carbonImpactsDataPoints[lowerBound];
        const upperData = carbonImpactsDataPoints[upperBound];
        const t = (emissions - lowerBound) / (upperBound - lowerBound); // Interpolation factor

        const interpolatedData = {};
        for (const key in lowerData) {
            if (typeof lowerData[key] === 'number') {
                interpolatedData[key] = lerp(lowerData[key], upperData[key], t);
            } else {
                interpolatedData[key] = lowerData[key]; // Non-numeric data (like strings)
            }
        }
        return interpolatedData;
    }


    // Initialize Chart.js Charts (only GDP chart remains)
    function initializeCharts(initialData) {
        const gdpCtx = document.getElementById('gdpChart').getContext('2d');
        if (gdpChartInstance) {
            gdpChartInstance.destroy();
        }
        gdpChartInstance = new Chart(gdpCtx, {
            type: 'bar',
            data: {
                labels: ['Projected 2035 GDP Change'],
                datasets: [{
                    label: 'GDP Change (%)',
                    data: [initialData.gdpChange],
                    backgroundColor: initialData.gdpChange >= 0 ? '#4CAF50' : '#F44336', // Green for positive, Red for negative
                    borderColor: initialData.gdpChange >= 0 ? '#388E3C' : '#D32F2F',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'GDP Change (%)'
                        },
                        min: -5, // Adjusted min/max for GDP chart
                        max: 6
                    },
                    x: {
                        ticks: {
                            display: false // Hide x-axis labels
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw.toFixed(1) + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Function to update the dashboard based on slider value
    function updateDashboard() {
        const emissions = parseInt(emissionsSlider.value);
        sliderValueSpan.textContent = `${emissions}%`;

        const data = getInterpolatedImpacts(emissions);

        // Update metric spans
        gdpChangeSpan.textContent = `${data.gdpChange >= 0 ? '+' : ''}${data.gdpChange.toFixed(1)}%`;
        adaptationCostsSpan.textContent = `$${data.adaptationCosts.toFixed(1)}B`;
        agricultureOutputSpan.textContent = `${data.agricultureOutput >= 0 ? '+' : ''}${data.agricultureOutput.toFixed(1)}%`;
        energyPricesSpan.textContent = `${data.energyPrices >= 0 ? '+' : ''}${data.energyPrices.toFixed(1)}%`;
        jobsCreatedSpan.textContent = `${data.jobsCreated >= 0 ? '+' : ''}${Math.round(data.jobsCreated).toLocaleString()}`;
        investmentInfluxSpan.textContent = `${data.investmentInflux >= 0 ? '+' : ''}$${Math.abs(data.investmentInflux).toFixed(1)}B`;

        heatMortalitySpan.textContent = `${Math.round(data.heatMortality)}`;
        displacedPopulationSpan.textContent = `${Math.round(data.displacedPopulation).toLocaleString()}`;
        socialStabilitySpan.textContent = `${Math.round(data.socialStability)}`;
        povertyReductionSpan.textContent = `${data.povertyReduction >= 0 ? '+' : ''}${data.povertyReduction.toFixed(1)}%`;
        cleanEnergyAccessSpan.textContent = `${data.cleanEnergyAccess >= 0 ? '+' : ''}${data.cleanEnergyAccess.toFixed(1)}%`;
        communityEngagementSpan.textContent = `${data.communityEngagement >= 0 ? '+' : ''}${data.communityEngagement.toFixed(1)}%`;

        tempIncreaseSpan.textContent = `${data.tempIncrease >= 0 ? '+' : ''}${data.tempIncrease.toFixed(2)}°C`;
        seaLevelRiseSpan.textContent = `${data.seaLevelRise.toFixed(1)} cm`;
        extremeEventsSpan.textContent = `${data.extremeEvents >= 0 ? '+' : ''}${data.extremeEvents.toFixed(1)}%`;
        biodiversitySpan.textContent = `${data.biodiversity >= 0 ? '+' : ''}${data.biodiversity.toFixed(1)}%`; // Using 'biodiversity'
        waterAvailabilitySpan.textContent = `${data.waterAvailability >= 0 ? '+' : ''}${data.waterAvailability.toFixed(1)}%`;
        biodiversityLossSpan.textContent = `${data.biodiversityLoss.toFixed(1)}%`; // Using 'biodiversityLoss'
        renewableEnergyAdoptionSpan.textContent = `${data.renewableEnergyAdoption.toFixed(1)}%`;

        // Update graph bars and gauges (scaling adjusted for new data ranges)
        if (jobsGraph) { // Check if element exists
            jobsGraph.style.width = `${Math.max(0, Math.min(100, (data.jobsCreated / 150000) * 50 + 50))}%`; // Scale -150k to +150k to 0-100%
            jobsGraph.className = 'graph-bar' + (data.jobsCreated < 0 ? ' negative' : '');
        }
        if (investmentGraph) { // Check if element exists
            investmentGraph.style.width = `${Math.max(0, Math.min(100, (data.investmentInflux / 5.0) * 50 + 50))}%`; // Scale -2B to +5B to 0-100%
            investmentGraph.className = 'graph-bar' + (data.investmentInflux < 0 ? ' negative' : '');
        }
        if (heatGauge) {
            heatGauge.style.width = `${Math.max(0, Math.min(100, (data.heatMortality / 40) * 100))}%`; // Scale 0-40 to 0-100%
            heatGauge.className = 'gauge-fill';
            if (data.heatMortality > 30) heatGauge.classList.add('high');
            else if (data.heatMortality > 10) heatGauge.classList.add('moderate');
            else { heatGauge.classList.remove('high', 'moderate'); }
        }
        if (povertyGauge) {
            povertyGauge.style.width = `${Math.max(0, Math.min(100, (data.povertyReduction + 10) / 40 * 100))}%`; // Scale -10 to 30 to 0-100
            povertyGauge.className = 'gauge-fill';
            if (data.povertyReduction < 0) povertyGauge.classList.add('high');
            else if (data.povertyReduction < 10) povertyGauge.classList.add('moderate');
            else { povertyGauge.classList.remove('high', 'moderate'); }
        }
        if (energyGauge) {
            energyGauge.style.width = `${Math.max(0, Math.min(100, (data.cleanEnergyAccess + 5) / 100 * 100))}%`; // Scale 0-95 to 0-100
            energyGauge.className = 'gauge-fill';
            if (data.cleanEnergyAccess < 30) energyGauge.classList.add('high');
            else if (data.cleanEnergyAccess < 60) energyGauge.classList.add('moderate');
            else { energyGauge.classList.remove('high', 'moderate'); }
        }
        if (communityGauge) {
            communityGauge.style.width = `${Math.max(0, Math.min(100, (data.communityEngagement + 10) / 100 * 100))}%`; // Scale 0-90 to 0-100
            communityGauge.className = 'gauge-fill';
            if (data.communityEngagement < 30) communityGauge.classList.add('high');
            else if (data.communityEngagement < 60) communityGauge.classList.add('moderate');
            else { communityGauge.classList.remove('high', 'moderate'); }
        }
        if (biodiversityGauge) {
            biodiversityGauge.style.width = `${Math.max(0, Math.min(100, (data.biodiversityLoss / 50) * 100))}%`; // Scale 0-50 to 0-100
            biodiversityGauge.className = 'gauge-fill';
            if (data.biodiversityLoss > 30) biodiversityGauge.classList.add('high');
            else if (data.biodiversityLoss > 15) biodiversityGauge.classList.add('moderate');
            else { biodiversityGauge.classList.remove('high', 'moderate'); }
        }
        if (renewableGauge) {
            renewableGauge.style.width = `${Math.max(0, Math.min(100, data.renewableEnergyAdoption))}%`; // Scale 0-100 to 0-100
            renewableGauge.className = 'gauge-fill';
            if (data.renewableEnergyAdoption < 30) renewableGauge.classList.add('high');
            else if (data.renewableEnergyAdoption < 60) renewableGauge.classList.add('moderate');
            else { renewableGauge.classList.remove('high', 'moderate'); }
        }

        // Update Thermometer
        if (tempThermometerFill && thermometerBulb) {
            const maxTemp = 3.5; // Max temperature in our data range (0.2 to 2.5, setting a max around 3.5 for scaling)
            const minTemp = 0; // Minimum temperature for scaling
            const scaledTemp = Math.max(minTemp, Math.min(maxTemp, data.tempIncrease)); // Clamp value
            const fillHeight = (scaledTemp / maxTemp) * 100; // Percentage of thermometer height

            tempThermometerFill.style.height = `${fillHeight}%`;

            // Change thermometer color based on temperature
            tempThermometerFill.classList.remove('cold', 'warm', 'hot');
            thermometerBulb.classList.remove('cold', 'warm', 'hot');

            if (data.tempIncrease > 2.5) {
                tempThermometerFill.classList.add('hot');
                thermometerBulb.classList.add('hot');
            } else if (data.tempIncrease > 1.5) {
                tempThermometerFill.classList.add('warm');
                thermometerBulb.classList.add('warm');
            } else {
                tempThermometerFill.classList.add('cold');
                thermometerBulb.classList.add('cold');
            }
        }


        // Update Chart.js data (only GDP chart remains)
        gdpChartInstance.data.datasets[0].data[0] = data.gdpChange;
        gdpChartInstance.data.datasets[0].backgroundColor = data.gdpChange >= 0 ? '#4CAF50' : '#F44336';
        gdpChartInstance.data.datasets[0].borderColor = data.gdpChange >= 0 ? '#388E3C' : '#D32F2F';
        gdpChartInstance.update();

        // Tipping point warnings
        tippingPointWarning.classList.add('hidden');
        tippingPointPositive.classList.add('hidden');

        if (data.tempIncrease >= 2.5 || data.seaLevelRise >= 4 || data.gdpChange <= -2.5 || data.socialStability <= 30) {
            tippingPointWarning.classList.remove('hidden');
            tippingPointWarning.innerHTML = `<strong>WARNING: Approaching Critical Tipping Points!</strong> High risk of severe and irreversible changes.`;
        } else if (data.tempIncrease <= 0.5 && data.gdpChange >= 4 && data.renewableEnergyAdoption >= 90) {
            tippingPointPositive.classList.remove('hidden');
            tippingPointPositive.innerHTML = `<strong>SUCCESS! Positive Tipping Point Reached:</strong> Sustainable growth and environmental restoration are self-reinforcing.`;
        }

        mapDescription.textContent = getMapDescription(emissions);
    }

    function getMapDescription(emissionsChange) {
        if (emissionsChange > 30) {
            return "Severe impacts: Extensive coastal erosion, increased flooding in Montevideo, agricultural collapse due to extreme weather.";
        } else if (emissionsChange > 0) {
            return "Moderate impacts: Increased coastal flooding, significant agricultural shifts, water scarcity in dry periods.";
        } else if (emissionsChange < -70) {
            return "Transformative positive impacts: Coastal ecosystems restored, abundant freshwater, new green infrastructure and thriving biodiversity.";
        } else if (emissionsChange < 0) {
            return "Minor positive changes: Coastal resilience improving, water quality gains, and early ecological restoration.";
        }
        return "No significant impact shown yet. Explore different scenarios.";
    }


    // Initialize dashboard with default value
    emissionsSlider.value = 0; // Set initial slider value to 0 (baseline)
    initializeCharts(getInterpolatedImpacts(emissionsSlider.value)); // Initialize charts with default data
    updateDashboard(); // Update all other metrics

    // Add event listener for slider changes
    emissionsSlider.addEventListener('input', updateDashboard);
});
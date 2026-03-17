document.addEventListener('DOMContentLoaded', () => {
    const inputs = {}; 
    let ui = null;

    // === 1. FONCTIONS UTILITAIRES ET SETTERS SÉCURISÉS ===
    const elCache = new Map();
    const getEl = (id) => {
        if (elCache.has(id)) return elCache.get(id);
        const el = document.getElementById(id);
        elCache.set(id, el);
        return el;
    };

    const buildUI = () => ({
        // Conteneurs / sections
        bonifiedResultsSection: getEl('bonified-results-section'),
        // Résumé haut
        prixFAI: getEl('prixFAI'),
        FAg_montant: getEl('FAg_montant'),
        // Résumé opération
        res_prixFAI: getEl('res_prixFAI'),
        FN_montant: getEl('FN_montant'),
        res_FN_montant: getEl('res_FN_montant'),
        FG_description: getEl('FG_description'),
        FG_montant: getEl('FG_montant'),
        res_FG_montant: getEl('res_FG_montant'),
        res_FD: getEl('res_FD'),
        res_Courtier: getEl('res_Courtier'),
        res_T: getEl('res_T'),
        coutTotalOperation: getEl('coutTotalOperation'),
        res_apport: getEl('res_apport'),
        res_credit_demande: getEl('res_credit_demande'),
        res_classic_loan_amount: getEl('res_classic_loan_amount'),
        res_classic_loan_amount_row: getEl('res_classic_loan_amount_row'),
        // Capacité / limites
        S_display: getEl('S_display'),
        AutresCredits_display: getEl('AutresCredits_display'),
        AutresCharges_display: getEl('AutresCharges_display'),
        mensualitemax_tdt: getEl('mensualitemax_tdt'),
        mensualitemax_rav: getEl('mensualitemax_rav'),
        mensualitemax_retenue: getEl('mensualitemax_retenue'),
        capEmpruntMax_20: getEl('capEmpruntMax_20'),
        capEmpruntMax_25: getEl('capEmpruntMax_25'),
        current_TE_20_val: getEl('current_TE_20_val'),
        current_TA_20_val: getEl('current_TA_20_val'),
        current_TE_25_val: getEl('current_TE_25_val'),
        current_TA_25_val: getEl('current_TA_25_val'),

        // Scénarios / comparaisons
        scen_classic_amount_display: getEl('scen_classic_amount_display'),
        scen_classic_mensualite_20: getEl('scen_classic_mensualite_20'),
        scen_classic_mensualite_25: getEl('scen_classic_mensualite_25'),
        scen_classic_mensualite_diff: getEl('scen_classic_mensualite_diff'),
        comp_mensualite_20: getEl('comp_mensualite_20'),
        comp_mensualite_25: getEl('comp_mensualite_25'),
        comp_mensualite_diff: getEl('comp_mensualite_diff'),
        comp_resteAVivre_20: getEl('comp_resteAVivre_20'),
        comp_resteAVivre_25: getEl('comp_resteAVivre_25'),
        comp_resteAVivre_diff: getEl('comp_resteAVivre_diff'),
        comp_coutCredit_20: getEl('comp_coutCredit_20'),
        comp_coutCredit_25: getEl('comp_coutCredit_25'),
        comp_coutCredit_diff: getEl('comp_coutCredit_diff'),
        comp_coutOperation_20: getEl('comp_coutOperation_20'),
        comp_coutOperation_25: getEl('comp_coutOperation_25'),
        comp_coutOperation_diff: getEl('comp_coutOperation_diff'),
        comp_TAEG_20: getEl('comp_TAEG_20'),
        comp_TAEG_25: getEl('comp_TAEG_25'),
        comp_TAEG_diff: getEl('comp_TAEG_diff'),
        comp_tauxEndettement_20: getEl('comp_tauxEndettement_20'),
        comp_tauxEndettement_25: getEl('comp_tauxEndettement_25'),
        comp_tauxEndettement_diff: getEl('comp_tauxEndettement_diff'),
        respectMensualite_20: getEl('respectMensualite_20'),
        respectMensualite_25: getEl('respectMensualite_25'),
        comp_coutOperationClassicOnly_20: getEl('comp_coutOperationClassicOnly_20'),
        comp_coutOperationClassicOnly_25: getEl('comp_coutOperationClassicOnly_25'),
        comp_coutOperationClassicOnly_diff: getEl('comp_coutOperationClassicOnly_diff'),
        comp_savings_20: getEl('comp_savings_20'),
        comp_savings_25: getEl('comp_savings_25'),
        comp_savings_diff: getEl('comp_savings_diff'),

        // TAEG global
        comp_TAEG_global_20: getEl('comp_TAEG_global_20'),
        comp_TAEG_global_25: getEl('comp_TAEG_global_25'),
        comp_TAEG_global_diff: getEl('comp_TAEG_global_diff'),

        // Lignes scénario bonifiés
        ptb_scenario_header_row: getEl('ptb_scenario_header_row'),
        ptb_scenario_amount_row: getEl('ptb_scenario_amount_row'),
        ptb_scenario_mensualite_row: getEl('ptb_scenario_mensualite_row'),
        scen_ptb_amount_display: getEl('scen_ptb_amount_display'),
        scen_ptb_mensualite_display: getEl('scen_ptb_mensualite_display'),
        pib_scenario_header_row: getEl('pib_scenario_header_row'),
        pib_scenario_amount_row: getEl('pib_scenario_amount_row'),
        pib_scenario_mensualite_row: getEl('pib_scenario_mensualite_row'),
        scen_pib_amount_display: getEl('scen_pib_amount_display'),
        scen_pib_mensualite_display: getEl('scen_pib_mensualite_display'),

        // Analyse apport
        A_display: getEl('A_display'),
        apportAnalysisContainer: getEl('apportAnalysisContainer'),

        // Revente - affichage
        resale_horizon_display: getEl('resale_horizon_display'),
        resale_scenario_duration_display: getEl('resale_scenario_duration_display'),
        res_resale_price: getEl('res_resale_price'),
        res_remaining_capital: getEl('res_remaining_capital'),
        res_ira_fees: getEl('res_ira_fees'),
        res_resale_costs: getEl('res_resale_costs'),
        res_net_proceeds: getEl('res_net_proceeds'),
        res_initial_apport: getEl('res_initial_apport'),
        res_capital_amorti: getEl('res_capital_amorti'),
        res_total_wasted_costs: getEl('res_total_wasted_costs'),
        res_bilan_patrimonial: getEl('res_bilan_patrimonial'),
        res_net_balance: getEl('res_net_balance'),
        res_real_balance: getEl('res_real_balance'),
        ira_classic_amount: getEl('ira_classic_amount'),
        ira_pib_amount: getEl('ira_pib_amount'),
        ira_ptb_amount: getEl('ira_ptb_amount'),

        // IRA containers
        ira_mode: getEl('ira_mode'),
        ira_percentage_container: getEl('ira_percentage_container'),
        ira_manual_container: getEl('ira_manual_container'),
        ira_pib_container: getEl('ira_pib_container'),
        ira_ptb_container: getEl('ira_ptb_container'),

        // Revente - containers (toggle)
        pv_annual_container: getEl('pv_annual_container'),
        pv_manual_container: getEl('pv_manual_container'),
        inflation_annual_container: getEl('inflation_annual_container'),
        inflation_cumulative_container: getEl('inflation_cumulative_container'),

        // Modale amortissement
        amortizationTableContainer: getEl('amortizationTableContainer'),
        amortizationModalTitle: getEl('amortizationModalTitle'),

        // Inputs containers (toggle)
        pibInputsContainer: getEl('pibInputsContainer'),
        ptbInputsContainer: getEl('ptbInputsContainer'),
        manualGuaranteeInput: getEl('manualGuaranteeInput'),
        FG_details: getEl('FG_details'),
        fgDetailsToggleTrigger: getEl('fgDetailsToggleTrigger'),
        fn_breakdown: getEl('fn_breakdown'),
        fnDetailsToggleTrigger: getEl('fnDetailsToggleTrigger'),
        btn_reset: getEl('btn-reset'),

        // PTB/PIB détails
        ptbDetailsResultBox: getEl('ptbDetailsResultBox'),
        pibDetailsResultBox: getEl('pibDetailsResultBox'),
        ptb_warning_msg: getEl('ptb_warning_msg'),
        res_ptb_amount_row: getEl('res_ptb_amount_row'),
        res_pib_amount_row: getEl('res_pib_amount_row'),
        res_ptb_amount: getEl('res_ptb_amount'),
        res_pib_amount: getEl('res_pib_amount'),

        ptb_res_amount: getEl('ptb_res_amount'),
        ptb_res_duration: getEl('ptb_res_duration'),
        ptb_res_bfm_rate: getEl('ptb_res_bfm_rate'),
        ptb_res_bonification_rate: getEl('ptb_res_bonification_rate'),
        ptb_res_borrower_rate: getEl('ptb_res_borrower_rate'),
        ptb_res_insurance_rate: getEl('ptb_res_insurance_rate'),
        ptb_res_insurance_status: getEl('ptb_res_insurance_status'),
        ptb_res_monthly_payment: getEl('ptb_res_monthly_payment'),
        ptb_res_total_interest_cost: getEl('ptb_res_total_interest_cost'),
        ptb_res_total_insurance_cost: getEl('ptb_res_total_insurance_cost'),
        ptb_res_total_cost: getEl('ptb_res_total_cost'),
        ptbMaxAmount_display: getEl('ptbMaxAmount_display'),
        ptbBonificationRate_display: getEl('ptbBonificationRate_display'),
        ptbBorrowerRate_display: getEl('ptbBorrowerRate_display'),
        ptb_scenario_duration_label: getEl('ptb_scenario_duration_label'),

        pib_res_amount: getEl('pib_res_amount'),
        pib_res_duration: getEl('pib_res_duration'),
        pib_res_bfm_rate: getEl('pib_res_bfm_rate'),
        pib_res_bonification_rate: getEl('pib_res_bonification_rate'),
        pib_res_borrower_rate: getEl('pib_res_borrower_rate'),
        pib_res_insurance_rate: getEl('pib_res_insurance_rate'),
        pib_res_monthly_payment: getEl('pib_res_monthly_payment'),
        pib_res_total_interest_cost: getEl('pib_res_total_interest_cost'),
        pib_res_total_insurance_cost: getEl('pib_res_total_insurance_cost'),
        pib_res_total_cost: getEl('pib_res_total_cost'),
        pibMaxAmount_display: getEl('pibMaxAmount_display'),
        pibBonificationRate_display: getEl('pibBonificationRate_display'),
        pibBorrowerRate_display: getEl('pibBorrowerRate_display'),
        pib_scenario_duration_label: getEl('pib_scenario_duration_label'),

        // Form inputs principaux (pour lireEtatFormulaire)
        form: {
            // Sliders (quand nécessaire)
            RAV_slider: getEl('RAV'),

            P_num: getEl('P_num'),
            FAg_num: getEl('FAg_num'),
            M_num: getEl('M_num'),
            typeBien: getEl('typeBien'),
            chargeAgence: getEl('chargeAgence'),
            FN_mode: getEl('FN_mode'),
            FN_num: getEl('FN_num'),
            FD_num: getEl('FD_num'),
            Courtier_num: getEl('Courtier_num'),
            T_num: getEl('T_num'),
            A_num: getEl('A_num'),
            S_num: getEl('S_num'),
            AutresCredits_num: getEl('AutresCredits_num'),
            AutresCharges_num: getEl('AutresCharges_num'),
            TEdt_num: getEl('TEdt_num'),
            RAV_num: getEl('RAV_num'),
            TE_20_num: getEl('TE_20_num'),
            TA_20_num: getEl('TA_20_num'),
            TE_25_num: getEl('TE_25_num'),
            TA_25_num: getEl('TA_25_num'),
            enablePIB: getEl('enablePIB'),
            enablePTB: getEl('enablePTB'),
            pibBFMRate_num: getEl('pibBFMRate_num'),
            typeGarantie: getEl('typeGarantie'),
            pibZone: getEl('pibZone'),
            ptbAgentStatus: getEl('ptbAgentStatus'),
            ptbZone: getEl('ptbZone'),
            resaleScenarioRef: getEl('resaleScenarioRef'),
            pv_mode: getEl('pv_mode'),
            inflation_mode: getEl('inflation_mode'),

            // PTB/PIB params
            pibRFR_num: getEl('pibRFR_num'),
            pibHouseholdSize_num: getEl('pibHouseholdSize_num'),
            pibDuration_num: getEl('pibDuration_num'),
            pibInsuranceRate_num: getEl('pibInsuranceRate_num'),
            ptbRFR_num: getEl('ptbRFR_num'),
            ptbHouseholdSize_num: getEl('ptbHouseholdSize_num'),
            ptbAmountWanted_num: getEl('ptbAmountWanted_num'),
            ptbDuration_num: getEl('ptbDuration_num'),
            ptbInsuranceRate_num: getEl('ptbInsuranceRate_num'),

            // Revente params
            resaleHorizon_num: getEl('resaleHorizon_num'),
            plusValue_num: getEl('plusValue_num'),
            resalePriceManual_num: getEl('resalePriceManual_num'),
            resaleFees_num: getEl('resaleFees_num'),
            inflation_num: getEl('inflation_num'),
            inflationCumulative_num: getEl('inflationCumulative_num'),

            // IRA inputs
            ira_manual_num: getEl('ira_manual_num'),
            ira_classic_num: getEl('ira_classic_num'),
            ira_pib_num: getEl('ira_pib_num'),
            ira_ptb_num: getEl('ira_ptb_num')
        }
    });

    // Regroupement des recalculs UI pour éviter le jank pendant le drag (1 calcul par frame max)
    let calcRafId = null;
    const requestRecalc = () => {
        if (calcRafId !== null) return;
        calcRafId = requestAnimationFrame(() => {
            calcRafId = null;
            calculateAllCore();
        });
    };
    const sauvegarderEtat = (state) => {
        // On sauvegarde l'objet state sous forme de texte dans le navigateur
        localStorage.setItem('simuImmoDGAC_sauvegarde', JSON.stringify(state));
    };

    // Évite de spammer localStorage pendant le drag (I/O sync potentiellement coûteux)
    let saveTimerId = null;
    let pendingStateForSave = null;
    const scheduleSave = (state) => {
        pendingStateForSave = state;
        if (saveTimerId !== null) clearTimeout(saveTimerId);
        saveTimerId = setTimeout(() => {
            saveTimerId = null;
            if (pendingStateForSave) sauvegarderEtat(pendingStateForSave);
        }, 250);
    };

    const chargerEtat = () => {
        const sauvegarde = localStorage.getItem('simuImmoDGAC_sauvegarde');
        if (!sauvegarde) return; // S'il n'y a pas de sauvegarde, on ne fait rien
        
        try {
            const savedState = JSON.parse(sauvegarde);
            
            // On réinjecte les valeurs dans chaque champ
            for (const [key, value] of Object.entries(savedState)) {
                // Pour les champs numériques (sliders liés)
                const numEl = getEl(`${key}_num`);
                const sliderEl = getEl(key);
                if (numEl && sliderEl) {
                    numEl.value = value;
                    sliderEl.value = value;
                    // Met à jour la jauge visuelle du slider
                    const min = parseFloat(sliderEl.min), max = parseFloat(sliderEl.max);
                    let val = Math.max(min, Math.min(value, max));
                    sliderEl.style.setProperty('--val', `${max === min ? 0 : ((val - min) / (max - min)) * 100}%`);
                } 
                // Pour les listes déroulantes (select) ou autres inputs simples
                else {
                    const el = getEl(key);
                    if (el) {
                        if (el.type === 'checkbox') el.checked = value;
                        else el.value = value;
                    }
                }
            }
            
            // On gère les cases à cocher spécifiques pour PTB et PIB qui ont des IDs différents du state
            if (ui?.form?.enablePIB && savedState.isPIBEnabled !== undefined) ui.form.enablePIB.checked = savedState.isPIBEnabled;
            if (ui?.form?.enablePTB && savedState.isPTBEnabled !== undefined) ui.form.enablePTB.checked = savedState.isPTBEnabled;

        } catch (e) {
            console.warn("Erreur lors du chargement de la sauvegarde", e);
        }
    };
    const getNumVal = id => {
        const el = getEl(`${id}_num`);
        return el ? parseFloat(el.value) || 0 : 0;
    };
    const formatCurrency = (value, digits = 0) => (Number(value) || 0).toLocaleString('fr-FR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
    const formatPercentage = (value, digits = 2) => (Number(value) || 0).toFixed(digits);
    const formatNumber = (value, decimals = 0) => (Number(value) || 0).toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    
    const setText = (id, text) => { const el = getEl(id); if (el) el.textContent = text; };
    const setHTML = (id, html) => { const el = getEl(id); if (el) el.innerHTML = html; };
    const setDisplay = (id, display) => { const el = getEl(id); if (el) el.style.display = display; };
    const setTextEl = (el, text) => { if (el) el.textContent = text; };
    const setHTMLEl = (el, html) => { if (el) el.innerHTML = html; };
    const setDisplayEl = (el, display) => { if (el) el.style.display = display; };

    const infoMessages = {
        chargeAgence_info: "Charge Acquéreur : Les frais d'agence sont exclus du calcul des frais de notaire (économie), mais la banque exigera souvent que vous les payiez avec votre apport personnel. Charge Vendeur : L'agence est incluse dans le prix, le notaire taxe le tout (plus cher), mais la banque le finance plus facilement (moins d'apport exigé).",
        Courtier_info: "Frais de courtage : Rémunération du courtier en crédit immobilier pour son service d'intermédiation avec les banques. Ces frais s'ajoutent au coût total.",
        resaleHorizon_info: "Nombre d'années après l'achat auquel vous simulez la revente du bien.",
        plusValue_info: "Estimation de l'évolution de la valeur du bien. Vous pouvez choisir un taux annuel ou entrer le prix final directement.",
        inflation_info: "L'inflation diminue la valeur de l'argent dans le temps. Ce taux est utilisé pour calculer la valeur 'réelle' de votre gain (ou perte) final en euros d'aujourd'hui.",
        ira_info: "Indemnités de Remboursement Anticipé (IRA). Plafonnées par la loi à 3% du capital restant dû ou 6 mois d'intérêts. Le calcul applique ce pourcentage sur le capital restant, sans dépasser le plafond légal.",
        resaleDiagnostics_info: "Coût estimé des diagnostics obligatoires et des menus frais divers pour la vente.",
        res_real_balance_info: "Le bilan financier net ajusté pour tenir compte de l'inflation. Il représente le gain ou la perte en pouvoir d'achat par rapport à aujourd'hui.",
        bilan_patrimonial_info: "Gain ou perte sur la valeur du bien (Prix de revente - Coût d'achat global - Frais de revente et IRA). Ne déduit PAS ce que le crédit vous a coûté en intérêts et assurances.",
        bilan_financier_info: "Le véritable résultat net de toute l'opération sur votre compte en banque. C'est le Bilan Patrimonial auquel on soustrait l'ensemble des intérêts et assurances payés à la banque.",
        P_info: "Prix net vendeur : Le prix affiché par le propriétaire ou l'agence, hors frais supplémentaires.", FAg_info: "Frais d'agence : Pourcentage du prix net vendeur que l'agence immobilière perçoit pour ses services. Ils sont généralement inclus dans le prix final 'Frais d'Agence Inclus' (FAI).", M_info: "Prix du mobilier : Le prix du mobilier éventuellement inclus dans la vente. Ce montant peut être déduit de l'assiette de calcul des frais de notaire sur l'ancien, réduisant ainsi leur coût.", typeBien_info: "Type de bien : 'Ancien' pour les biens existants (frais de notaire plus élevés). 'Neuf' pour les constructions neuves ou VEFA (Vente en l'État Futur d'Achèvement) où les frais de notaire sont réduits.", FN_mode_info: "Calcul Frais Notaire : 'Automatique' utilise un barème notarial estimatif. 'Manuel' vous permet de saisir un montant précis si vous l'avez déjà obtenu.", FN_info: "Frais de notaire : Incluent les taxes (droits de mutation), les émoluments du notaire et les débours. Leur montant dépend du prix du bien et de son type (ancien/neuf).", typeGarantie_info: "Type de garantie du prêt classique : La garantie est une sûreté prise par la banque en cas de non-remboursement du prêt classique. Le PIB/PTB ne requiert pas de garantie spécifique selon la documentation DGAC.", FG_manual_info: "Coût garantie manuel : Si vous avez une estimation précise ou un type de garantie non standard pour le prêt classique, entrez son coût ici.", FD_info: "Frais de dossier bancaire pour le prêt classique : Somme facturée par la banque pour l'étude et la mise en place de votre dossier de prêt immobilier classique. Le PIB/PTB n'a pas de frais de dossier.", T_info: "Montant total des travaux : Coût estimé des rénovations ou aménagements que vous prévoyez de réaliser après l'acquisition. Ce montant s'ajoute au coût total de l'opération et peut être partiellement financé par un PTB.", A_info: "Apport personnel : Somme d'argent dont vous disposez et que vous êtes prêt à investir dans l'opération. Il réduit le montant du crédit à demander.", TE_20_info: "Taux d'intérêt nominal du prêt classique sur 20 ans, hors assurance.", TA_20_info: "Taux annuel de l'assurance emprunteur pour le prêt classique sur 20 ans.", TE_25_info: "Taux d'intérêt nominal du prêt classique sur 25 ans, hors assurance.", TA_25_info: "Taux annuel de l'assurance emprunteur pour le prêt classique sur 25 ans.", S_info: "Salaires nets mensuels du foyer : Le total des revenus nets de votre foyer par mois, avant impôt sur le revenu mais après prélèvements sociaux.", AutresCredits_info: "Autres crédits en cours : La somme des mensualités de vos autres crédits (crédit auto, crédit consommation, etc.) qui s'ajoutent à votre charge d'endettement.", AutresCharges_info: "Autres charges mensuelles fixes : Entrez ici le total de vos autres charges mensuelles récurrentes qui ne sont pas des crédits (par exemple, un loyer si vous en payez encore un, pensions alimentaires versées, etc.). Ces charges réduisent votre capacité d'emprunt.", tedt_info: "Taux d'endettement maximal : Pourcentage de vos revenus nets que les banques acceptent généralement comme mensualités de crédits (tous crédits confondus, y compris le nouveau prêt immobilier) et charges fixes. Souvent plafonné à 35%.", rav_info: "Reste à vivre minimal : Somme minimale que la banque estime nécessaire pour vos dépenses courantes après paiement de toutes les mensualités (crédits, nouveau prêt) et charges fixes. Varie selon la composition du foyer et la localisation.", res_credit_info: "Crédit Total Nécessaire = Coût Total de l'Opération (incluant frais de garantie et dossier du prêt classique) - Apport Personnel. Ce montant sera réparti entre le PTB, PIB (si applicable) et le prêt classique.", res_fg_info: "Montant estimé des frais de garantie pour le prêt classique.", res_cto_info: "Coût Total de l'Opération = Prix FAI + Frais de Notaire + Frais de Garantie (prêt classique) + Frais de Dossier (prêt classique) + Frais de Courtier + Coût des Travaux. C'est le montant total à financer avant apport.", pibZone_info: "Zone géographique du bien (A/A bis, B1/B2, C) selon l'arrêté du 1er août 2014. Détermine le montant maximum du PIB et les plafonds de ressources pour la bonification de 3%.", pibRFR_info: "Revenu Fiscal de Référence de votre foyer pour l'année N-2 (ex: avis d'impôt 2024 sur revenus 2023 pour une demande en 2025). Sert à déterminer l'éligibilité à la bonification de 3%.", pibHouseholdSize_info: "Nombre de personnes composant le foyer fiscal (figurant sur l'avis d'imposition). Utilisé pour les plafonds de ressources de la bonification de 3%.", pibBFMRate_info: "Taux d'intérêt nominal proposé par la Banque Française Mutualiste (BFM) avant la bonification de la DGAC. Par défaut 3,74% (valable du 01/01/2025 au 30/06/2025). Ce taux est révisé semestriellement et s'applique au PIB et au PTB.", pibDuration_info: "Durée de remboursement du PIB, entre 3 et 12 ans.", pibInsuranceRate_info: "Taux annuel de l'assurance emprunteur pour le PIB (obligatoire). Saisissez le taux proposé par votre assureur (BFM ou autre). La DGAC ne spécifie pas de taux pour l'assurance groupe BFM du PIB. Mettre 0 si vous ne connaissez pas le taux, mais cela sous-estimera la mensualité réelle.", ptbAgentStatus_info: "Statut de l'agent DGAC/ENAC (Actif ou Retraité). Impacte le montant maximum du PTB.", ptbZone_info: "Zone géographique des travaux. Pertinent pour les agents actifs pour déterminer le montant maximum du PTB. Pour les retraités, le plafond est unique et la zone n'est pas utilisée pour le plafond.", ptbRFR_info: "Revenu Fiscal de Référence N-2 du foyer. Utilisé pour le calcul de la bonification du PTB (identique au PIB).", ptbHouseholdSize_info: "Nombre de personnes au foyer fiscal. Utilisé pour le calcul de la bonification du PTB (identique au PIB).", ptbAmountWanted_info: "Montant que vous souhaitez emprunter via le PTB. Sera plafonné par le montant total des travaux et le maximum autorisé pour le PTB (minimum 7 500€ si pris).", ptbDuration_info: "Durée de remboursement du PTB, entre 3 et 10 ans.", ptbIncludeInsurance_info: "L'assurance pour le PTB est facultative et s'élève à 0,36% du capital emprunté si vous la souscrivez.", fg_montant: "Coût estimé de la garantie pour le prêt classique. Le PIB/PTB n'exige pas de caution spécifique selon la documentation DGAC.", taeg_comp_info: "TAEG (Taux Annuel Effectif Global) du Prêt Classique : Coût total du prêt classique exprimé en pourcentage annuel. Il intègre son taux d'intérêt nominal, son coût d'assurance, les frais de dossier, les frais de courtier et les frais de garantie. Le PIB/PTB, n'ayant pas de frais de dossier ni de garantie spécifiques, a un coût plus direct.", res_scenarios_info: "Simulation de financement combiné (PTB + PIB + Prêt Classique sur 20 et 25 ans), avec calcul des mensualités, du coût total des crédits, du TAEG du prêt classique, de votre taux d'endettement et du reste à vivre.", res_apport_req_info: "Exigences d'apport : Les banques demandent souvent un apport couvrant au moins les frais d'acquisition (notaire, garantie, dossier, courtier). Un apport de 10% du prix du bien est une règle commune pour rassurer.", cas1_info: "Frais d'acquisition (Notaire, Garantie Prêt Classique, Dossier Prêt Classique, Courtier) + 10% du prix net vendeur : Exigence courante des banques. Votre apport doit couvrir l'ensemble des frais liés à l'acquisition PLUS au moins 10% du prix d'achat du bien.", cas2_info: "10% du coût total de l'opération : Une autre exigence courante, où votre apport doit représenter au moins 10% du montant total de l'opération (incluant tous les frais et travaux).", cas3_info: "Couverture des frais d'acquisition : Le minimum d'apport souvent exigé par les banques, il doit couvrir tous les frais liés à l'acquisition (frais de notaire, frais de garantie, frais de dossier bancaire du prêt classique et frais de courtier).", cas4_info: "Votre apport comparé à 10% du prix du bien hors frais d'agence. Un indicateur de base pour évaluer votre mise de fonds par rapport au prix 'brut' du bien.", cas5_info: "Votre apport comparé à 10% du prix du bien incluant les frais d'agence. Cet indicateur prend en compte le coût du bien tel qu'il est souvent affiché.", cas6_info: "Votre apport comparé à la somme des frais d'acquisition (notaire, garantie prêt classique, dossier prêt classique, courtier) ET de 10% du prix du bien incluant les frais d'agence. C'est un scénario d'apport solide.", classic_only_info: "Estimation du coût total de votre projet si l'intégralité du 'Crédit total nécessaire' était financée par un prêt classique uniquement (aux taux et conditions du prêt classique saisis), incluant les frais de garantie recalculés pour ce montant total.", savings_info: "Différence entre le coût total de l'opération avec un financement 100% classique et le coût total avec l'utilisation des prêts bonifiés (PTB/PIB). Un chiffre positif indique une économie."
    };

    const PIB_MAX_AMOUNTS = { "A": 40000, "B1B2": 32000, "C": 25000 };
    const PTB_MAX_AMOUNTS = { actif: { "A": 40000, "B1B2": 32000, "C": 25000 }, retraite: { "A": 15000, "B1B2": 15000, "C": 15000 }};
    const MIN_BONIFIED_AMOUNT = 7500;
    const BONIFICATION_THRESHOLDS = { "A": {1:37000,2:51800,3:62900,4:74000,5:85100}, "B1B2":{1:32000,2:44800,3:54400,4:64000,5:73600}, "C":{1:27000,2:37800,3:45900,4:54000,5:62100}};


    // === 2. FONCTIONS DE CALCUL MATHÉMATIQUE ===

    const calculerMensualiteCredit = (capital, tauxAnnuelNominal, dureeMois) => {
        if (capital <= 0 || dureeMois <= 0) return 0;
        const tauxMensuelNominal = tauxAnnuelNominal / 100 / 12;
        return tauxAnnuelNominal === 0 ? capital / dureeMois : (capital * tauxMensuelNominal) / (1 - Math.pow(1 + tauxMensuelNominal, -dureeMois));
    };
    
    const calculerCapaciteEmprunt = (mensualiteMax, tauxNominal, tauxAssurance, dureeMoisLoan) => {
        if (mensualiteMax <= 0 || dureeMoisLoan <= 0) return 0;
        const tauxMensuelNominal = tauxNominal / 100 / 12;
        const tauxMensuelAssurance = tauxAssurance / 100 / 12;
        let mensualitePourUnEuroDeCapital_nominal = (tauxMensuelNominal === 0) ? (1 / dureeMoisLoan) : tauxMensuelNominal / (1 - Math.pow(1 + tauxMensuelNominal, -dureeMoisLoan));
        const mensualiteTotalePourUnEuro = mensualitePourUnEuroDeCapital_nominal + tauxMensuelAssurance;
        return mensualiteTotalePourUnEuro > 0 ? mensualiteMax / mensualiteTotalePourUnEuro : 0;
    };

    const calculerCapitalRestantDu = (capital, tauxAnnuel, dureeMoisTotale, moisPayes) => {
        if (moisPayes >= dureeMoisTotale) return 0;
        if (capital <= 0) return 0;
        const tauxMensuel = tauxAnnuel / 100 / 12;
        if (tauxMensuel === 0) return capital - (capital / dureeMoisTotale) * moisPayes;
        return capital * (Math.pow(1 + tauxMensuel, dureeMoisTotale) - Math.pow(1 + tauxMensuel, moisPayes)) / (Math.pow(1 + tauxMensuel, dureeMoisTotale) - 1);
    };

    function calculerEmolumentsNotaire(base) {
        if (base <= 0) return 0; 
        if (base <= 6500) return base * 0.03870;
        if (base <= 17000) return 251.55 + (base - 6500) * 0.01596; 
        if (base <= 60000) return 251.55 + 167.58 + (base - 17000) * 0.01064; 
        return 251.55 + 167.58 + 457.52 + (base - 60000) * 0.00799; 
    }

    function evaluerFraisGarantie(typeGarantie, montantPret, isAncien, valeurManuelle) {
        if (montantPret <= 0) return { cout: 0, description: "Aucune garantie nécessaire." };
        if (typeGarantie === 'manual_guarantee') return { cout: valeurManuelle, description: "Garantie manuelle." };

        const calculerEmolumentsGarantie = b => { 
            if(b<=0) return 0; 
            if(b<=30000) return b*0.015; 
            if(b<=100000) return 450+(b-30000)*0.01; 
            return 1150+(b-100000)*0.0075; 
        };

        let cout = 0, description = "";
        switch (typeGarantie) {
            case 'caution': 
                cout = montantPret * 0.012; 
                description = `Caution prêt classique (environ 1.2% de ${formatCurrency(montantPret)}).`; 
                break;
            case 'hypotheque': 
                const tpfHyp = montantPret * 0.00715;
                const csiHyp = Math.max(15, montantPret * 0.0005);
                const emolsActe = calculerEmolumentsGarantie(montantPret);
                cout = tpfHyp + csiHyp + (emolsActe * 1.2) + 250; 
                description = `Hypothèque conventionnelle.`; 
                break;
            case 'ppd': 
                if (isAncien) {
                    const emolsActePPD = calculerEmolumentsGarantie(montantPret);
                    const csiPPD = Math.max(15, montantPret * 0.0005);
                    cout = (emolsActePPD * 1.2) + csiPPD + 200; 
                    description = `Privilège Prêteur de Deniers (PPD).`;
                } else {
                    cout = montantPret * 0.012; 
                    description = `PPD non applicable (neuf), caution estimée à 1.2%.`;
                }
                break;
        }
        return { cout, description };
    }

    const calculerTAEG = (capitalEmprunte, mensualiteTotale, dureeMois, fraisInitiauxLoan) => {
        if (capitalEmprunte <= 0 || mensualiteTotale <= 0 || dureeMois <= 0) return 0.0;
        const netCapitalReceived = capitalEmprunte - fraisInitiauxLoan;
        if (netCapitalReceived <= 0) return 0.0;
        const npvFunction = monthlyRate => {
            if (monthlyRate <= -1.0 + 1e-12) return -Infinity;
            let sum = Math.abs(monthlyRate) < 1e-9 ? mensualiteTotale * dureeMois : mensualiteTotale * (1 - Math.pow(1 + monthlyRate, -dureeMois)) / monthlyRate;
            return netCapitalReceived - sum;
        };
        const valAtZeroRate = npvFunction(0.0);
        if (Math.abs(valAtZeroRate) < 1e-9 || (valAtZeroRate > 0 && netCapitalReceived < mensualiteTotale * dureeMois)) return 0.0;
        let lowRate = 0.0, fLow = valAtZeroRate, highRate;
        const rateCandidates = [0.0001, 0.01, 0.05, 0.1, 0.2, 0.5, 1.0, 2.0];
        let foundHighRate = false;
        for (const candidate of rateCandidates) {
            highRate = candidate; let fHigh = npvFunction(highRate);
            if (fHigh * fLow < 0) { foundHighRate = true; break; }
            if (Math.abs(fHigh) < 1e-9) return highRate * 1200; 
            if (fLow > 0 && fHigh > 0 && fHigh < fLow) { lowRate = highRate; fLow = fHigh; }
            else if (fLow > 0 && fHigh < 0) { foundHighRate = true; break; }
        }
        if (!foundHighRate) return fLow < 0 ? highRate * 1200 : 0.0;
        let midRate;
        for (let i = 0; i < 100; i++) { 
            midRate = (lowRate + highRate) / 2;
            let fMid = npvFunction(midRate);
            if (Math.abs(fMid) < 1e-9 || (highRate - lowRate) / 2 < 1e-8) return midRate * 1200;
            (fMid * fLow > 0) ? lowRate = midRate : highRate = midRate;
            if (isNaN(midRate) || !isFinite(midRate) || midRate < -1.0 + 1e-9) return 0.0;
        }
        return midRate * 1200; 
    };

    const generateAmortizationSchedule = (loanName, principal, annualNominalRate, durationYears, annualInsuranceRateOnInitialCapital) => {
        const schedule = [];
        if (principal <= 0 || durationYears <= 0) return schedule;
        const monthlyNominalRate = annualNominalRate / 100 / 12;
        const numberOfMonths = durationYears * 12;
        const monthlyPaymentPrincipalInterest = calculerMensualiteCredit(principal, annualNominalRate, numberOfMonths);
        const monthlyInsuranceAmount = (principal * (annualInsuranceRateOnInitialCapital / 100)) / 12;
        const totalMonthlyPaymentWithInsurance = monthlyPaymentPrincipalInterest + monthlyInsuranceAmount;
        let remainingBalance = principal;
        for (let i = 1; i <= numberOfMonths; i++) {
            const interestPaid = remainingBalance * monthlyNominalRate;
            let principalRepaid = monthlyPaymentPrincipalInterest - interestPaid;
            if (i === numberOfMonths) principalRepaid = remainingBalance; 
            remainingBalance -= principalRepaid;
            if (Math.abs(remainingBalance) < 0.01) remainingBalance = 0; 
            schedule.push({
                month: i, paymentWithoutInsurance: monthlyPaymentPrincipalInterest, interest: interestPaid,
                principalRepaid, insurance: monthlyInsuranceAmount, totalPayment: totalMonthlyPaymentWithInsurance, remainingBalance
            });
        }
        return schedule;
    };

    // === 3. FONCTIONS D'INTERFACE (UI Setup) ===

    const setupSliderAndNumber = (id) => {
        const slider = getEl(id);
        const num = getEl(`${id}_num`);
        if (!slider || !num) return;
        
        slider.dataset.defaultValue = slider.value;

        const updateSliderVisual = () => {
            const min = parseFloat(slider.min), max = parseFloat(slider.max);
            let val = Math.max(min, Math.min(parseFloat(slider.value), max));
            slider.style.setProperty('--val', `${max === min ? 0 : ((val - min) / (max - min)) * 100}%`);
        };

        slider.addEventListener('input', () => { 
            if (!slider.disabled) { 
                num.value = slider.value; 
                updateSliderVisual(); 
                requestRecalc(); 
            }
        });
        num.addEventListener('input', () => {
            if (!num.readOnly) {
                if (num.value !== "" && !isNaN(parseFloat(num.value))) {
                    const currentVal = parseFloat(num.value);
                    if (currentVal >= parseFloat(slider.min) && currentVal <= parseFloat(slider.max)) slider.value = currentVal;
                }
                updateSliderVisual(); 
                requestRecalc();
            }
        });
        num.addEventListener('blur', () => {
            if (!num.readOnly) {
                let val = parseFloat(num.value);
                const minVal = parseFloat(slider.min), maxVal = parseFloat(slider.max);
                const stepAttr = slider.step, step = parseFloat(stepAttr) || 0.01;
                const decimals = (stepAttr && stepAttr.includes('.')) ? stepAttr.split('.')[1].length : (step.toString().includes('.') ? step.toString().split('.')[1].length : 0);
                val = isNaN(val) || val < minVal ? minVal : (val > maxVal ? maxVal : val);
                num.value = val.toFixed(decimals); slider.value = num.value;
                updateSliderVisual(); 
                requestRecalc();
            }
        });

        slider.addEventListener('dblclick', () => {
            if (slider.disabled) return;
            const defaultValue = slider.dataset.defaultValue;
            if (defaultValue !== undefined) {
                slider.value = defaultValue;
                num.value = defaultValue;
                updateSliderVisual();
                requestRecalc();
            }
        });

        updateSliderVisual();
    };

    const setInputState = (id, isManual, config) => {
        const slider = getEl(id);
        const num = getEl(`${id}_num`);
        if (!slider || !num) return;
        num.readOnly = !isManual;
        slider.disabled = !isManual;
        slider.style.display = (id === 'FN' && !isManual) ? 'none' : 'inline-block'; 
        if (id === 'FN') setDisplay('FN_pc_manual', isManual ? 'inline' : 'none');
        if (config) {
            Object.assign(slider, config);
            Object.assign(num, config);
        }
        const min = parseFloat(slider.min), max = parseFloat(slider.max);
        let val = Math.max(min, Math.min(parseFloat(slider.value), max));
        slider.style.setProperty('--val', `${max === min ? 0 : ((val - min) / (max - min)) * 100}%`);
    };

    const setupDetailsToggle = (toggleElementId, contentElementId, textWhenHidden, textWhenVisible) => {
        const toggleElement = getEl(toggleElementId);
        const contentElement = getEl(contentElementId);
        if (!toggleElement || !contentElement) return;
        
        contentElement.classList.add('visible'); 
        toggleElement.textContent = textWhenVisible;
        toggleElement.addEventListener('click', () => {
            const isNowVisible = contentElement.classList.toggle('visible');
            toggleElement.textContent = isNowVisible ? textWhenVisible : textWhenHidden;
        });
    };

    const displayAmortizationModal = (loanName, schedule) => {
        setTextEl(ui?.amortizationModalTitle, `Tableau d'Amortissement - ${loanName}`);
        const container = ui?.amortizationTableContainer;
        if (!container) return;

        container.textContent = '';

        const table = document.createElement('table');
        table.className = 'amortization-data-table';

        const thead = document.createElement('thead');
        const headRow = document.createElement('tr');
        [
            'Mois',
            'Mens.(hors ass.)',
            'Intérêts',
            'Capital Remb.',
            'Assurance',
            'Mens. Totale',
            'Capital Rest. Dû'
        ].forEach(label => {
            const th = document.createElement('th');
            th.textContent = label;
            headRow.appendChild(th);
        });
        thead.appendChild(headRow);

        const tbody = document.createElement('tbody');
        schedule.forEach(r => {
            const tr = document.createElement('tr');
            const cells = [
                String(r.month),
                `${formatCurrency(r.paymentWithoutInsurance, 2)}€`,
                `${formatCurrency(r.interest, 2)}€`,
                `${formatCurrency(r.principalRepaid, 2)}€`,
                `${formatCurrency(r.insurance, 2)}€`,
                `${formatCurrency(r.totalPayment, 2)}€`,
                `${formatCurrency(r.remainingBalance, 2)}€`
            ];
            cells.forEach(v => {
                const td = document.createElement('td');
                td.textContent = v;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(table);
        document.querySelector('.modal-overlay')?.classList.add('visible');
    };

    // === 4. LOGIQUE D'APPLICATION Principale ===

    const numFrom = (el) => (el ? (parseFloat(el.value) || 0) : 0);

    function lireEtatFormulaire(ui) {
        const f = ui?.form || {};
        const state = {
            P: numFrom(f.P_num),
            FAg: numFrom(f.FAg_num),
            M: numFrom(f.M_num),
            typeBien: f.typeBien?.value || 'ancien',
            chargeAgence: f.chargeAgence?.value || 'acquereur',
            FN_mode: f.FN_mode?.value || 'auto',
            FN_input: numFrom(f.FN_num),
            FD: numFrom(f.FD_num),
            Courtier: numFrom(f.Courtier_num),
            T: numFrom(f.T_num),
            A: numFrom(f.A_num),
            S: numFrom(f.S_num),
            AutresCredits: numFrom(f.AutresCredits_num),
            AutresCharges: numFrom(f.AutresCharges_num),
            TEdt: numFrom(f.TEdt_num),
            RAV: numFrom(f.RAV_num),
            TE_20: numFrom(f.TE_20_num),
            TA_20: numFrom(f.TA_20_num),
            TE_25: numFrom(f.TE_25_num),
            TA_25: numFrom(f.TA_25_num),
            isPIBEnabled: !!f.enablePIB?.checked,
            pibBFMRate: numFrom(f.pibBFMRate_num),
            isPTBEnabled: !!f.enablePTB?.checked,

            // PTB/PIB params
            pibZone: f.pibZone?.value || 'A',
            pibRFR: numFrom(f.pibRFR_num),
            pibHouseholdSize: Math.max(1, Math.round(numFrom(f.pibHouseholdSize_num) || 1)),
            pibDuration: Math.max(3, Math.round(numFrom(f.pibDuration_num) || 10)),
            pibInsuranceRate: numFrom(f.pibInsuranceRate_num),

            ptbAgentStatus: f.ptbAgentStatus?.value || 'actif',
            ptbZone: f.ptbZone?.value || 'A',
            ptbRFR: numFrom(f.ptbRFR_num),
            ptbHouseholdSize: Math.max(1, Math.round(numFrom(f.ptbHouseholdSize_num) || 1)),
            ptbAmountWanted: numFrom(f.ptbAmountWanted_num),
            ptbDuration: Math.max(3, Math.round(numFrom(f.ptbDuration_num) || 7)),
            ptbInsuranceRate: numFrom(f.ptbInsuranceRate_num)
        };

        const uiState = {
            pvMode: f.pv_mode?.value || 'annual',
            inflationMode: f.inflation_mode?.value || 'annual',
            iraMode: ui?.ira_mode?.value || 'percentage',
            scenarioDuration: parseInt(f.resaleScenarioRef?.value || 20, 10),
            resale: {
                horizon: numFrom(f.resaleHorizon_num),
                plusValueAnnual: numFrom(f.plusValue_num),
                resalePriceManual: numFrom(f.resalePriceManual_num),
                fees: numFrom(f.resaleFees_num),
                inflationAnnual: numFrom(f.inflation_num),
                inflationCumulative: numFrom(f.inflationCumulative_num)
            },
            ira: {
                manualAmount: numFrom(f.ira_manual_num),
                classicPc: numFrom(f.ira_classic_num),
                pibPc: numFrom(f.ira_pib_num),
                ptbPc: numFrom(f.ira_ptb_num)
            }
        };

        return { state, uiState };
    }

    function gererFraisAcquisition(state) {
        const FAg_montant = state.P * (state.FAg / 100);
        const prixFAI = state.P + FAg_montant;

        let fn_details = { montant: 0, baseCalcul: 0, taxes: 0, emolumentsTTC: 0, debours: 0 };
        
        // NOUVEAU : Base Notaire -> Si charge vendeur, on taxe sur le prix FAI. Si charge acquéreur, sur le net vendeur.
        const baseNotaireBrute = state.chargeAgence === 'vendeur' ? prixFAI : state.P;

        if (state.FN_mode === 'auto') {
            fn_details.baseCalcul = state.typeBien === 'ancien' ? Math.max(0, baseNotaireBrute - state.M) : baseNotaireBrute;
            fn_details.taxes = state.typeBien === 'ancien' ? fn_details.baseCalcul * 0.0580665 : fn_details.baseCalcul * 0.00715;
            const emolHT = calculerEmolumentsNotaire(state.typeBien === 'ancien' ? fn_details.baseCalcul : baseNotaireBrute);
            fn_details.emolumentsTTC = emolHT * 1.2;
            fn_details.debours = 800;
            fn_details.montant = fn_details.taxes + fn_details.emolumentsTTC + fn_details.debours;
            
            // Mise à jour visuelle
            if (baseNotaireBrute > 0) {
                const val = (fn_details.montant / baseNotaireBrute) * 100;
                const fnSlider = getEl('FN'), fnNum = getEl('FN_num');
                if (fnSlider && fnNum) {
                    fnNum.value = val.toFixed(1); fnSlider.value = val.toFixed(1);
                }
            }
            setText('fn_base_calc', formatCurrency(fn_details.baseCalcul) + " €");
            setText('fn_type_bien_label', state.typeBien);
            setText('fn_taxes', formatCurrency(fn_details.taxes) + " €");
            setText('fn_emoluments', formatCurrency(fn_details.emolumentsTTC) + " €");
            setText('fn_debours', formatCurrency(fn_details.debours) + " €");
            setText('fn_taxes_pc', `${formatNumber(state.typeBien === 'ancien' ? 5.80665 : 0.715, 3)} %`);
            setText('fn_emoluments_pc', `${formatNumber(fn_details.baseCalcul > 0 ? (fn_details.emolumentsTTC / fn_details.baseCalcul) * 100 : 0, 3)} %`);
            setText('fn_debours_pc', baseNotaireBrute > 0 ? `${formatNumber((fn_details.debours / baseNotaireBrute) * 100, 3)} %` : '0 %');
        } else {
            fn_details.montant = state.FN_input;
            setText('FN_montant_pc', formatNumber(baseNotaireBrute > 0 ? (state.FN_input / baseNotaireBrute) * 100 : 0, 2));
        }

        const coutAvantGar = prixFAI + fn_details.montant + state.T + state.FD + state.Courtier;
        let besoinCreditInitial = Math.max(0, coutAvantGar - state.A);

        return { FAg_montant, prixFAI, fn_details, coutAvantGar, besoinCreditInitial };
    }

    function gererPlanFinancement(state, besoinCreditInitial, coutAvantGar) {
        let pib = { amount:0, monthlyPayment:0, totalInterest:0, totalCost:0, interestRate:0, bonification:0, maxPossible:0, duration: state.pibDuration || 10, insuranceRate: state.pibInsuranceRate };
        let ptb = { amount:0, monthlyPayment:0, totalInterest:0, totalCost:0, interestRate:0, bonification:0, maxPossible:0, duration: state.ptbDuration || 7, insuranceRate: state.ptbInsuranceRate };    
        const determinerPretBonifie = (loan, RFR, foyer, zone, amountWanted, maxLimitRef) => {
            let bonifRate = 0.02;
            const thresholds = BONIFICATION_THRESHOLDS[zone];
            if (thresholds && RFR <= thresholds[Math.min(foyer, 5)]) bonifRate = 0.03;
            
            loan.bonification = bonifRate * 100;
            loan.interestRate = Math.max(0, state.pibBFMRate - loan.bonification);
            
            let computedAmount = Math.min(amountWanted, maxLimitRef, loan.maxPossible);
            if (computedAmount > 0 && computedAmount < MIN_BONIFIED_AMOUNT) computedAmount = (maxLimitRef >= MIN_BONIFIED_AMOUNT) ? MIN_BONIFIED_AMOUNT : 0;
            
            loan.amount = Math.max(0, computedAmount);
        };

        if (state.isPTBEnabled && state.T > 0) {
            const statut = state.ptbAgentStatus || 'actif';
            const zonePtb = statut === 'retraite' ? "A" : (state.ptbZone || "A");
            ptb.maxPossible = PTB_MAX_AMOUNTS[statut]?.[zonePtb] || 0;
            determinerPretBonifie(ptb, state.ptbRFR, state.ptbHouseholdSize, zonePtb, state.ptbAmountWanted, Math.min(state.T, besoinCreditInitial));
            besoinCreditInitial = Math.max(0, besoinCreditInitial - ptb.amount);
        }

        if (state.isPIBEnabled) {
            const zonePib = state.pibZone || "A";
            pib.maxPossible = PIB_MAX_AMOUNTS[zonePib] || 0;
            determinerPretBonifie(pib, state.pibRFR, state.pibHouseholdSize, zonePib, besoinCreditInitial, besoinCreditInitial);
            besoinCreditInitial = Math.max(0, besoinCreditInitial - pib.amount);
        }

        // Évaluation de la garantie APRES avoir déduit PTB/PIB
        const garDetails = evaluerFraisGarantie(state.typeGarantie, besoinCreditInitial, state.typeBien === 'ancien', state.FG_manual);
        const coutTotalOperation = coutAvantGar + garDetails.cout;
        const besoinCreditFinalClassique = Math.max(0, coutTotalOperation - state.A - ptb.amount - pib.amount);

        // Calcul des mensualités des prêts bonifiés
        [ptb, pib].forEach(l => {
            if (l.amount > 0) {
                const mensInt = calculerMensualiteCredit(l.amount, l.interestRate, l.duration * 12);
                const mensAss = (l.amount * (l.insuranceRate / 100)) / 12;                l.monthlyPayment = mensInt + mensAss;
                l.totalInterest = Math.max(0, (mensInt * l.duration * 12) - l.amount);
                l.totalInsurance = mensAss * l.duration * 12;
                l.totalCost = l.totalInterest + l.totalInsurance;
            }
        });

        return { pib, ptb, garDetails, coutTotalOperation, besoinCreditFinalClassique };
    }

    // Algorithme de calcul du TAEG Global (Taux de Rendement Interne)
    function calculerTAEGGlobal(montantEmprunteTotal, fluxMensuels, fraisInitiaux) {
        if (montantEmprunteTotal <= 0 || fluxMensuels.length === 0) return 0;
        let minRate = 0, maxRate = 1, rate = 0.005; // Recherche par dichotomie
        const montantNetPercu = montantEmprunteTotal - fraisInitiaux; // On déduit les frais du montant perçu par l'emprunteur
        
        for (let i = 0; i < 50; i++) {
            let npv = -montantNetPercu;
            for (let t = 0; t < fluxMensuels.length; t++) {
                npv += fluxMensuels[t] / Math.pow(1 + rate, t + 1);
            }
            if (Math.abs(npv) < 0.01) break; // Précision atteinte au centime près
            if (npv > 0) { minRate = rate; rate = (rate + maxRate) / 2; } 
            else { maxRate = rate; rate = (rate + minRate) / 2; }
        }
        return (Math.pow(1 + rate, 12) - 1) * 100; // Conversion en TAEG annuel
    }

    function calculerScenariosClassiques(state, pib, ptb, besoinCreditFinalClassique, coutTotalOperation, prixFAI, fn_details, garDetails) {
        const scenarios = { 20: {}, 25: {} };
        const chargesFixes = state.AutresCredits + state.AutresCharges;
        
        const mensualiteMaxTdtGlobale = Math.max(0, (state.S * (state.TEdt / 100)) - chargesFixes);
        const mensualiteMaxRavGlobale = Math.max(0, state.S - chargesFixes - state.RAV);
        const mensualiteMaxRetenueGlobale = Math.min(mensualiteMaxTdtGlobale, mensualiteMaxRavGlobale);

        const mensualiteMaxPourPretClassique = Math.max(0, mensualiteMaxRetenueGlobale - pib.monthlyPayment - ptb.monthlyPayment);
        const capEmpruntMax_20 = calculerCapaciteEmprunt(mensualiteMaxPourPretClassique, state.TE_20, state.TA_20, 240);
        const capEmpruntMax_25 = calculerCapaciteEmprunt(mensualiteMaxPourPretClassique, state.TE_25, state.TA_25, 300);

        [20, 25].forEach(duree => {
            const s = scenarios[duree];
            s.classic_amount = besoinCreditFinalClassique;
            s.mensInt = calculerMensualiteCredit(s.classic_amount, duree === 20 ? state.TE_20 : state.TE_25, duree * 12);
            s.mensAss = (s.classic_amount * ((duree === 20 ? state.TA_20 : state.TA_25) / 100 / 12));
            s.mensTotaleClassique = s.classic_amount > 0 ? s.mensInt + s.mensAss : 0;

            s.coutCreditGlobal = Math.max(0, (s.mensInt * duree * 12) - s.classic_amount) + (s.mensAss * duree * 12) + pib.totalCost + ptb.totalCost;
            s.mensTotaleGlobale = s.mensTotaleClassique + pib.monthlyPayment + ptb.monthlyPayment;
            s.resteAVivre = state.S - (s.mensTotaleGlobale + chargesFixes);
            s.respect = s.mensTotaleGlobale <= mensualiteMaxRetenueGlobale + 0.01;

            const fraisInitiauxPourTAEG = state.FD + garDetails.cout + state.Courtier;
            s.classic_TAEG = s.classic_amount > 0 ? calculerTAEG(s.classic_amount, s.mensTotaleClassique, duree * 12, fraisInitiauxPourTAEG) : 0;
            s.tauxEndettement = state.S > 0 ? ((s.mensTotaleGlobale + chargesFixes) / state.S) * 100 : Infinity;

            // --- DEBUT DU NOUVEAU BLOC POUR LE TAEG GLOBAL ---
            // 1. On crée un tableau vide pour tous les mois du projet (ex: 240 mois ou 300 mois)
            let fluxMensuels = new Array(duree * 12).fill(0);
            
            // 2. On ajoute les mensualités classiques sur toute la durée
            for(let i = 0; i < duree * 12; i++) {
                fluxMensuels[i] += s.mensTotaleClassique;
            }
            // 3. On superpose les mensualités du PIB (s'il y en a) sur sa propre durée
            if(pib.amount > 0) { 
                for(let i = 0; i < Math.min(pib.duration * 12, duree * 12); i++) {
                    fluxMensuels[i] += pib.monthlyPayment; 
                }
            }
            // 4. On superpose les mensualités du PTB (s'il y en a) sur sa propre durée
            if(ptb.amount > 0) { 
                for(let i = 0; i < Math.min(ptb.duration * 12, duree * 12); i++) {
                    fluxMensuels[i] += ptb.monthlyPayment; 
                }
            }
            
            // 5. On calcule le TAEG global avec tous ces flux mélangés
            const montantEmprunteTotal = s.classic_amount + pib.amount + ptb.amount;
            s.taegGlobal = montantEmprunteTotal > 0 ? calculerTAEGGlobal(montantEmprunteTotal, fluxMensuels, fraisInitiauxPourTAEG) : 0;
            // --- FIN DU NOUVEAU BLOC ---


            // Calcul du coût si on faisait tout en crédit classique (pour voir l'économie)
            let coutOpPourClassicOnly = coutTotalOperation;
            if ((coutTotalOperation - state.A) > 0) {
                let totalCredit = coutTotalOperation - state.A;
                let fraisGarClassicOnly = evaluerFraisGarantie(state.typeGarantie, totalCredit, state.typeBien === 'ancien', state.FG_manual).cout;
                let coutTotalOpAvantCreditClassicOnly = prixFAI + fn_details.montant + state.T + state.FD + state.Courtier + fraisGarClassicOnly;
                let vraiCreditTotal = Math.max(0, coutTotalOpAvantCreditClassicOnly - state.A);

                let mensIntClassicOnly = calculerMensualiteCredit(vraiCreditTotal, duree === 20 ? state.TE_20 : state.TE_25, duree * 12);
                let mensAssClassicOnly = vraiCreditTotal * ((duree === 20 ? state.TA_20 : state.TA_25) / 100 / 12);
                let coutCreditTotalClassicOnly = Math.max(0, (mensIntClassicOnly * duree * 12) - vraiCreditTotal) + (mensAssClassicOnly * duree * 12);

                coutOpPourClassicOnly = coutTotalOpAvantCreditClassicOnly + coutCreditTotalClassicOnly;
            }
            s.coutOpPourClassicOnly = coutOpPourClassicOnly;

            let savings = coutOpPourClassicOnly - (coutTotalOperation + s.coutCreditGlobal);
            if (pib.amount === 0 && ptb.amount === 0) savings = 0;
            s.savings = savings;
        });

        return { scenarios, mensualiteMaxTdtGlobale, mensualiteMaxRavGlobale, mensualiteMaxRetenueGlobale, capEmpruntMax_20, capEmpruntMax_25 };
    }

    function calculerExigencesApport(state, fn_details, garDetails, FAg_montant) {
        // 1. Calculer les frais annexes (fonds perdus que la banque ne veut pas financer)
        const apportAgence = state.chargeAgence === 'acquereur' ? FAg_montant : 0;
        const fraisAnnexes = fn_details.montant + garDetails.cout + state.FD + state.Courtier + apportAgence;

        // 2. Voir si l'apport couvre ces frais
        const difference = state.A - fraisAnnexes;
        const fraisCouverts = difference >= 0;
        
        // 3. Calculer ce qu'il reste pour "les murs" (le prix net vendeur)
        const restePourMurs = Math.max(0, difference);
        const pourcentageMurs = state.P > 0 ? (restePourMurs / state.P) * 100 : 0;

        return {
            fraisAnnexes,
            fraisCouverts,
            manque: fraisCouverts ? 0 : Math.abs(difference),
            restePourMurs,
            pourcentageMurs
        };
    }

    const updateBonifiedLoanDisplay = (ui, state, loanObj, type, detailsMap) => {
        const isEnabled = type === 'ptb' ? state.isPTBEnabled : state.isPIBEnabled;
        const detailsBox = type === 'ptb' ? ui.ptbDetailsResultBox : ui.pibDetailsResultBox;
        const resAmountRow = type === 'ptb' ? ui.res_ptb_amount_row : ui.res_pib_amount_row;
        const resAmount = type === 'ptb' ? ui.res_ptb_amount : ui.res_pib_amount;
        const maxEl = type === 'ptb' ? ui.ptbMaxAmount_display : ui.pibMaxAmount_display;
        const bonifEl = type === 'ptb' ? ui.ptbBonificationRate_display : ui.pibBonificationRate_display;
        const borrowerEl = type === 'ptb' ? ui.ptbBorrowerRate_display : ui.pibBorrowerRate_display;
        const durationLabelEl = type === 'ptb' ? ui.ptb_scenario_duration_label : ui.pib_scenario_duration_label;

        setDisplayEl(detailsBox, isEnabled ? 'block' : 'none');
        setDisplayEl(resAmountRow, loanObj.amount > 0 ? 'table-row' : 'none');

        if (type === 'ptb') {
            setDisplayEl(ui.ptb_warning_msg, (isEnabled && loanObj.amount === 0) ? 'block' : 'none');
        }

        if (isEnabled) {
            setTextEl(resAmount, formatCurrency(loanObj.amount) + " €");
            for (const key in detailsMap) {
                const el = detailsMap[key];
                const valueToDisplay = loanObj[key];
                if (!el) continue;
                if (['interestRate', 'bonification', 'insuranceRate'].includes(key)) setTextEl(el, formatPercentage(valueToDisplay, 2) + " %");
                else if (['monthlyPayment', 'totalCost'].includes(key)) setTextEl(el, formatCurrency(valueToDisplay, 2) + " €");
                else if (['totalInterest', 'totalInsurance', 'amount'].includes(key)) setTextEl(el, formatCurrency(valueToDisplay, 0) + " €");
                else if (key === 'duration') setTextEl(el, valueToDisplay + " ans");
                else setTextEl(el, valueToDisplay);
            }
            if (type === 'ptb') {
                const isIncluded = (Number(loanObj.insuranceRate) || 0) > 0;
                setTextEl(ui.ptb_res_insurance_status, isIncluded ? `Incluse (${formatPercentage(loanObj.insuranceRate, 2)}%)` : 'Non incluse');
            }
            setTextEl(durationLabelEl, `${loanObj.duration} ans (fixe)`);
        }

        setHTMLEl(maxEl, `<strong>${formatCurrency(loanObj.maxPossible)}</strong> €`);
        setHTMLEl(bonifEl, `<strong>${formatPercentage(loanObj.bonification, 1)}</strong> %`);
        setHTMLEl(borrowerEl, `<strong>${formatPercentage(loanObj.interestRate, 2)}</strong> %`);
    };

    const updateBonifiedSections = (ui, state, pib, ptb) => {
        setDisplayEl(ui.bonifiedResultsSection, (state.isPTBEnabled || state.isPIBEnabled) ? 'flex' : 'none');
        updateBonifiedLoanDisplay(
            ui,
            state,
            ptb,
            'ptb',
            {
                amount: ui.ptb_res_amount,
                duration: ui.ptb_res_duration,
                interestRate: ui.ptb_res_borrower_rate,
                bonification: ui.ptb_res_bonification_rate,
                insuranceRate: ui.ptb_res_insurance_rate,
                monthlyPayment: ui.ptb_res_monthly_payment,
                totalInterest: ui.ptb_res_total_interest_cost,
                totalInsurance: ui.ptb_res_total_insurance_cost,
                totalCost: ui.ptb_res_total_cost
            }
        );
        setTextEl(ui.ptb_res_bfm_rate, `${formatPercentage(state.pibBFMRate, 2)} %`);

        updateBonifiedLoanDisplay(
            ui,
            state,
            pib,
            'pib',
            {
                amount: ui.pib_res_amount,
                duration: ui.pib_res_duration,
                interestRate: ui.pib_res_borrower_rate,
                bonification: ui.pib_res_bonification_rate,
                insuranceRate: ui.pib_res_insurance_rate,
                monthlyPayment: ui.pib_res_monthly_payment,
                totalInterest: ui.pib_res_total_interest_cost,
                totalInsurance: ui.pib_res_total_insurance_cost,
                totalCost: ui.pib_res_total_cost
            }
        );
        setTextEl(ui.pib_res_bfm_rate, `${formatPercentage(state.pibBFMRate, 2)} %`);
    };

    const updateOperationSummary = (ui, state, FAg_montant, prixFAI, fn_details, garDetails, coutTotalOperation, besoinCreditFinalClassique) => {
        setTextEl(ui.FAg_montant, formatCurrency(FAg_montant));
        setTextEl(ui.prixFAI, formatCurrency(prixFAI));

        setTextEl(ui.res_prixFAI, formatCurrency(prixFAI) + " €");
        setTextEl(ui.FN_montant, state.FN_mode === 'manual' ? '' : formatCurrency(fn_details.montant) + ' €');
        setTextEl(ui.res_FN_montant, formatCurrency(fn_details.montant) + " €");

        setTextEl(ui.FG_description, garDetails.description);
        setTextEl(ui.FG_montant, formatCurrency(garDetails.cout));
        setTextEl(ui.res_FG_montant, formatCurrency(garDetails.cout) + " €");

        setTextEl(ui.res_FD, formatCurrency(state.FD) + " €");
        setTextEl(ui.res_Courtier, formatCurrency(state.Courtier) + " €");
        setTextEl(ui.res_T, formatCurrency(state.T) + " €");

        setTextEl(ui.coutTotalOperation, formatCurrency(coutTotalOperation) + " €");
        setTextEl(ui.res_apport, formatCurrency(state.A) + " €");
        setTextEl(ui.res_credit_demande, formatCurrency(coutTotalOperation - state.A) + " €");
        setTextEl(ui.res_classic_loan_amount, formatCurrency(besoinCreditFinalClassique) + " €");
        setTextEl(ui.scen_classic_amount_display, formatCurrency(besoinCreditFinalClassique) + " €");
        setDisplayEl(ui.res_classic_loan_amount_row, besoinCreditFinalClassique > 0 ? 'table-row' : 'none');
    };

    const updateCapacityAndLimits = (ui, state, scenData) => {
        setTextEl(ui.S_display, formatCurrency(state.S));
        setTextEl(ui.AutresCredits_display, formatCurrency(state.AutresCredits));
        setTextEl(ui.AutresCharges_display, formatCurrency(state.AutresCharges));

        setTextEl(ui.mensualitemax_tdt, formatCurrency(scenData.mensualiteMaxTdtGlobale) + " €");
        setTextEl(ui.mensualitemax_rav, formatCurrency(scenData.mensualiteMaxRavGlobale) + " €");
        setTextEl(ui.mensualitemax_retenue, formatCurrency(scenData.mensualiteMaxRetenueGlobale) + " €");

        setTextEl(ui.capEmpruntMax_20, formatCurrency(scenData.capEmpruntMax_20) + " €");
        setTextEl(ui.capEmpruntMax_25, formatCurrency(scenData.capEmpruntMax_25) + " €");
        setTextEl(ui.current_TE_20_val, formatNumber(state.TE_20, 2));
        setTextEl(ui.current_TA_20_val, formatNumber(state.TA_20, 2));
        setTextEl(ui.current_TE_25_val, formatNumber(state.TE_25, 2));
        setTextEl(ui.current_TA_25_val, formatNumber(state.TA_25, 2));
    };

    const updateScenarioValues = (ui, state, scenData, coutTotalOperation) => {
        [20, 25].forEach(duree => {
            const s = scenData.scenarios[duree];
            setTextEl(duree === 20 ? ui.scen_classic_mensualite_20 : ui.scen_classic_mensualite_25, formatCurrency(s.mensTotaleClassique, 2) + " €");
            setTextEl(duree === 20 ? ui.comp_mensualite_20 : ui.comp_mensualite_25, formatCurrency(s.mensTotaleGlobale, 2) + " €");
            setTextEl(duree === 20 ? ui.comp_resteAVivre_20 : ui.comp_resteAVivre_25, formatCurrency(s.resteAVivre) + " €");
            setTextEl(duree === 20 ? ui.comp_coutCredit_20 : ui.comp_coutCredit_25, formatCurrency(s.coutCreditGlobal) + " €");
            setTextEl(duree === 20 ? ui.comp_TAEG_20 : ui.comp_TAEG_25, `${formatPercentage(s.classic_TAEG, 3)} %`);
            setTextEl(duree === 20 ? ui.comp_tauxEndettement_20 : ui.comp_tauxEndettement_25, s.tauxEndettement === Infinity ? "N/A" : `${formatPercentage(s.tauxEndettement, 2)} %`);
            setTextEl(duree === 20 ? ui.comp_coutOperation_20 : ui.comp_coutOperation_25, formatCurrency(coutTotalOperation + s.coutCreditGlobal) + " €");

            const cellRespect = duree === 20 ? ui.respectMensualite_20 : ui.respectMensualite_25;
            if (cellRespect) {
                cellRespect.textContent = (coutTotalOperation - state.A) <= 0 ? 'N/A' : (s.respect ? '✅ OK' : '❌ NON');
                cellRespect.className = `status-cell ${(coutTotalOperation - state.A) <= 0 ? '' : (s.respect ? 'ok' : 'nok')}`;
            }
            setTextEl(duree === 20 ? ui.comp_coutOperationClassicOnly_20 : ui.comp_coutOperationClassicOnly_25, formatCurrency(s.coutOpPourClassicOnly) + " €");
            setTextEl(duree === 20 ? ui.comp_savings_20 : ui.comp_savings_25, formatCurrency(s.savings) + " €");
        });

        setTextEl(ui.scen_classic_mensualite_diff, formatCurrency(scenData.scenarios[25].mensTotaleClassique - scenData.scenarios[20].mensTotaleClassique, 2) + " €");
        setTextEl(ui.comp_mensualite_diff, formatCurrency(scenData.scenarios[25].mensTotaleGlobale - scenData.scenarios[20].mensTotaleGlobale, 2) + " €");
        setTextEl(ui.comp_coutCredit_diff, formatCurrency(scenData.scenarios[25].coutCreditGlobal - scenData.scenarios[20].coutCreditGlobal) + " €");
        setTextEl(ui.comp_coutOperation_diff, formatCurrency((coutTotalOperation + scenData.scenarios[25].coutCreditGlobal) - (coutTotalOperation + scenData.scenarios[20].coutCreditGlobal)) + " €");
        setTextEl(ui.comp_tauxEndettement_diff, (scenData.scenarios[20].tauxEndettement === Infinity || scenData.scenarios[25].tauxEndettement === Infinity) ? "N/A" : `${formatPercentage(scenData.scenarios[25].tauxEndettement - scenData.scenarios[20].tauxEndettement, 2)} %`);
        setTextEl(ui.comp_resteAVivre_diff, formatCurrency(scenData.scenarios[25].resteAVivre - scenData.scenarios[20].resteAVivre, 2) + " €");
        setTextEl(ui.comp_TAEG_diff, `${formatPercentage(scenData.scenarios[25].classic_TAEG - scenData.scenarios[20].classic_TAEG, 3)} %`);
        setTextEl(ui.comp_coutOperationClassicOnly_diff, formatCurrency(scenData.scenarios[25].coutOpPourClassicOnly - scenData.scenarios[20].coutOpPourClassicOnly) + " €");

        setTextEl(ui.comp_savings_diff, formatCurrency(scenData.scenarios[25].savings - scenData.scenarios[20].savings) + " €");
    };

    const updateApportAnalysis = (ui, state, analyseApport) => {
        setTextEl(ui.A_display, formatCurrency(state.A));

        let htmlApport = `
            <div style="margin-bottom: 8px;">
                <span style="font-size: 0.8rem; color: var(--text-light-color);">Frais annexes (Notaire, Garantie, Dossier, Courtage${state.chargeAgence === 'acquereur' ? ', Agence' : ''}) :</span>
                <br><strong>${formatCurrency(analyseApport.fraisAnnexes)} €</strong>
            </div>
        `;

        if (!analyseApport.fraisCouverts) {
            htmlApport += `
                <div style="color: var(--danger-color); font-weight: 600; padding: 6px; background-color: #ffebee; border-radius: 4px; font-size: 0.8rem;">
                    ❌ Votre apport est insuffisant. Il manque <strong>${formatCurrency(analyseApport.manque)} €</strong> pour couvrir les frais annexes obligatoires.
                </div>
            `;
        } else {
            htmlApport += `
                <div style="color: var(--primary-color); font-weight: 600; font-size: 0.8rem; margin-bottom: 10px;">
                    ✅ Frais annexes intégralement couverts.
                </div>
                <div style="padding-top: 8px; border-top: 1px dashed var(--border-color);">
                    <span style="font-size: 0.8rem; color: var(--text-light-color);">Apport restant injecté dans le bien (les "murs") :</span>
                    <br><strong>${formatCurrency(analyseApport.restePourMurs)} €</strong> 
                    <span style="color: var(--secondary-color); font-weight: bold; font-size: 0.85rem;">
                        (soit ${formatPercentage(analyseApport.pourcentageMurs, 1)} % du prix net vendeur)
                    </span>
                </div>
            `;
        }

        setHTMLEl(ui.apportAnalysisContainer, htmlApport);
    };

    const updateIraVisibility = (ui, state, uiState) => {
        const iraMode = uiState?.iraMode || 'percentage';
        setDisplayEl(ui.ira_percentage_container, iraMode === 'percentage' ? 'flex' : 'none');
        setDisplayEl(ui.ira_manual_container, iraMode === 'manual' ? 'flex' : 'none');
        if (iraMode === 'percentage') {
            setDisplayEl(ui.ira_pib_container, state.isPIBEnabled ? 'flex' : 'none');
            setDisplayEl(ui.ira_ptb_container, state.isPTBEnabled ? 'flex' : 'none');
        }
    };

    let combineOnlyEls = null;
    const updateTaegGlobalAndCombinedRows = (ui, scenData, pib, ptb) => {
        if (scenData && scenData.scenarios) {
            [20, 25].forEach(duree => {
                const s = scenData.scenarios[duree];
                if (s && s.taegGlobal !== undefined) setTextEl(duree === 20 ? ui.comp_TAEG_global_20 : ui.comp_TAEG_global_25, `${formatPercentage(s.taegGlobal, 2)} %`);
            });
            if (scenData.scenarios[20] && scenData.scenarios[25]) {
                const taegDiff = (scenData.scenarios[25].taegGlobal || 0) - (scenData.scenarios[20].taegGlobal || 0);
                setTextEl(ui.comp_TAEG_global_diff, `${formatPercentage(taegDiff, 2)} %`);
            }
        }

        const hasPTB = ptb && ptb.amount > 0;
        const hasPIB = pib && pib.amount > 0;
        const hasBonifiedLoans = hasPTB || hasPIB;

        setDisplayEl(ui.ptb_scenario_header_row, hasPTB ? 'table-row' : 'none');
        setDisplayEl(ui.ptb_scenario_amount_row, hasPTB ? 'table-row' : 'none');
        setDisplayEl(ui.ptb_scenario_mensualite_row, hasPTB ? 'table-row' : 'none');
        if (hasPTB) {
            setTextEl(ui.scen_ptb_amount_display, formatCurrency(ptb.amount) + " €");
            setTextEl(ui.scen_ptb_mensualite_display, formatCurrency(ptb.monthlyPayment, 2) + " €");
        }

        setDisplayEl(ui.pib_scenario_header_row, hasPIB ? 'table-row' : 'none');
        setDisplayEl(ui.pib_scenario_amount_row, hasPIB ? 'table-row' : 'none');
        setDisplayEl(ui.pib_scenario_mensualite_row, hasPIB ? 'table-row' : 'none');
        if (hasPIB) {
            setTextEl(ui.scen_pib_amount_display, formatCurrency(pib.amount) + " €");
            setTextEl(ui.scen_pib_mensualite_display, formatCurrency(pib.monthlyPayment, 2) + " €");
        }

        if (!combineOnlyEls) combineOnlyEls = Array.from(document.querySelectorAll('.combine-only'));
        combineOnlyEls.forEach(el => {
            el.style.display = hasBonifiedLoans ? 'table-row' : 'none';
        });
    };

    function mettreAJourInterface(ui, state, uiState, FAg_montant, prixFAI, fn_details, garDetails, coutTotalOperation, besoinCreditFinalClassique, pib, ptb, scenData, analyseApport) {
        updateBonifiedSections(ui, state, pib, ptb);
        updateOperationSummary(ui, state, FAg_montant, prixFAI, fn_details, garDetails, coutTotalOperation, besoinCreditFinalClassique);
        updateCapacityAndLimits(ui, state, scenData);
        updateScenarioValues(ui, state, scenData, coutTotalOperation);
        updateApportAnalysis(ui, state, analyseApport);
        updateIraVisibility(ui, state, uiState);
        updateTaegGlobalAndCombinedRows(ui, scenData, pib, ptb);
    }

    function calculateAllCore() {
        // 1. LECTURE DES DONNÉES
        const { state, uiState } = lireEtatFormulaire(ui);

        // (Ajustement spécifique de l'interface pour le Reste à Vivre)
        const ravSlider = ui?.form?.RAV_slider, ravNum = ui?.form?.RAV_num;
        if(ravSlider && ravNum) {
            const dynamicMaxRav = Math.min(parseFloat(ravSlider.getAttribute('data-original-max') || ravSlider.max), state.S);
            if (!ravSlider.hasAttribute('data-original-max')) ravSlider.setAttribute('data-original-max', ravSlider.max);
            ravSlider.max = dynamicMaxRav; ravNum.max = dynamicMaxRav;
            let currentRavVal = Math.max(parseFloat(ravSlider.min), Math.min(parseFloat(ravNum.value), dynamicMaxRav));
            const finalRavToSet = parseFloat(currentRavVal.toFixed(0));
            if (parseFloat(ravNum.value) !== finalRavToSet) { ravNum.value = finalRavToSet; ravSlider.value = finalRavToSet; }
            const min = parseFloat(ravSlider.min), max = parseFloat(ravSlider.max);
            let val = Math.max(min, Math.min(parseFloat(ravSlider.value), max));
            ravSlider.style.setProperty('--val', `${max === min ? 0 : ((val - min) / (max - min)) * 100}%`);
        }

        // 2. CALCULS MÉTIER
        let { FAg_montant, prixFAI, fn_details, coutAvantGar, besoinCreditInitial } = gererFraisAcquisition(state);
        let { pib, ptb, garDetails, coutTotalOperation, besoinCreditFinalClassique } = gererPlanFinancement(state, besoinCreditInitial, coutAvantGar);
        let scenData = calculerScenariosClassiques(state, pib, ptb, besoinCreditFinalClassique, coutTotalOperation, prixFAI, fn_details, garDetails);
        const analyseApport = calculerExigencesApport(state, fn_details, garDetails, FAg_montant);

        // 3. MISE À JOUR DE L'INTERFACE
        mettreAJourInterface(ui, state, uiState, FAg_montant, prixFAI, fn_details, garDetails, coutTotalOperation, besoinCreditFinalClassique, pib, ptb, scenData, analyseApport);

        // 4. CALCUL ET AFFICHAGE DE LA REVENTE
        const resultsForResale = { totalCreditNeeded: coutTotalOperation - state.A, pib, ptb, scenarios: scenData.scenarios, coutTotalOperation };
        calculerRevente(ui, uiState, resultsForResale, state.P, state.A, state);
        
        // 5. SAUVEGARDE AUTO (throttlée)
        scheduleSave(state);
    }

    // Compatibilité: les événements \"change\" et le code existant appellent calculateAll().
    function calculateAll() {
        calculateAllCore();
    }

    function calculerRevente(ui, uiState, results, prixAchatInitial, apportInitial, state) {
        const horizon = uiState?.resale?.horizon || 0;
        const pvMode = uiState?.pvMode || 'annual';
        const inflationMode = uiState?.inflationMode || 'annual';
        const iraMode = uiState?.iraMode || 'percentage';
        const fraisRevente = uiState?.resale?.fees || 0;

        const scenarioDuration = uiState?.scenarioDuration || 20;
        const scenarioRef = results.scenarios[scenarioDuration];
        const tauxClassiqueUsed = scenarioDuration === 25 ? state.TE_25 : state.TE_20;

        setTextEl(ui.resale_horizon_display, horizon);
        setTextEl(ui.resale_scenario_duration_display, scenarioDuration);
        
        let prixRevente = 0;
        if (pvMode === 'annual') {
            const plusValue = uiState?.resale?.plusValueAnnual || 0;
            prixRevente = prixAchatInitial * Math.pow(1 + plusValue / 100, horizon);
        } else {
            prixRevente = uiState?.resale?.resalePriceManual || 0;
        }

        const moisPayes = horizon * 12;
        const crd_classic = scenarioRef.classic_amount > 0 ? calculerCapitalRestantDu(scenarioRef.classic_amount, tauxClassiqueUsed, scenarioDuration * 12, moisPayes) : 0;
        const crd_pib = results.pib.amount > 0 ? calculerCapitalRestantDu(results.pib.amount, results.pib.interestRate, results.pib.duration * 12, moisPayes) : 0;
        const crd_ptb = results.ptb.amount > 0 ? calculerCapitalRestantDu(results.ptb.amount, results.ptb.interestRate, results.ptb.duration * 12, moisPayes) : 0;
        const totalCRD = crd_classic + crd_pib + crd_ptb;

        // Calcul Pénalités IRA Multiples
        let ira_fees = 0;
        if (iraMode === 'percentage') {
            const ira_classic_pc = uiState?.ira?.classicPc || 0;
            const ira_pib_pc = uiState?.ira?.pibPc || 0;
            const ira_ptb_pc = uiState?.ira?.ptbPc || 0;

            const sixMoisIntClassic = (crd_classic * (tauxClassiqueUsed/100)) / 2;
            const maxIraClassic = Math.min(crd_classic * 0.03, sixMoisIntClassic);
            const ira_classic_fees = maxIraClassic * (ira_classic_pc / 3);

            const sixMoisIntPib = (crd_pib * (results.pib.interestRate/100)) / 2;
            const maxIraPib = Math.min(crd_pib * 0.03, sixMoisIntPib);
            const ira_pib_fees = maxIraPib * (ira_pib_pc / 3);

            const sixMoisIntPtb = (crd_ptb * (results.ptb.interestRate/100)) / 2;
            const maxIraPtb = Math.min(crd_ptb * 0.03, sixMoisIntPtb);
            const ira_ptb_fees = maxIraPtb * (ira_ptb_pc / 3);

            setTextEl(ui.ira_classic_amount, formatCurrency(ira_classic_fees) + " €");
            setTextEl(ui.ira_pib_amount, formatCurrency(ira_pib_fees) + " €");
            setTextEl(ui.ira_ptb_amount, formatCurrency(ira_ptb_fees) + " €");

            ira_fees = ira_classic_fees + ira_pib_fees + ira_ptb_fees;
        } else {
            ira_fees = uiState?.ira?.manualAmount || 0;
        }

        const produitNet = prixRevente - totalCRD - ira_fees - fraisRevente;
        
        const totalMensualitesVersees = 
            (scenarioRef.mensTotaleClassique * Math.min(moisPayes, scenarioDuration * 12)) + 
            (results.pib.monthlyPayment * Math.min(moisPayes, results.pib.duration * 12)) + 
            (results.ptb.monthlyPayment * Math.min(moisPayes, results.ptb.duration * 12));
        
        // Capital remboursé = Montant initial emprunté total - Capital Restant Dû
        const capitalAmorti = results.totalCreditNeeded - totalCRD;
        // Intérêts et assurance = Toutes les mensualités payées - La part de capital qu'elles contenaient
        const interetsEtAssurancePayes = totalMensualitesVersees - capitalAmorti;
        
        // Bilan Patrimonial = L'opération immobilière pure (Revente Nette - Cout d'Acquisition Total)
        // Équivaut à : ProduitNet - Apport - CapitalAmorti
        const bilanPatrimonial = produitNet - apportInitial - capitalAmorti;

        // Bilan Financier = Bilan Patrimonial - Coût du financement (Intérêts + Assurances)
        const bilanFinancierNet = bilanPatrimonial - interetsEtAssurancePayes;

        // Application de l'inflation sur le Bilan Financier Final
        let inflationFactor = 1;
        if (inflationMode === 'annual') {
            const inflationAnnual = uiState?.resale?.inflationAnnual || 0;
            inflationFactor = Math.pow(1 + inflationAnnual / 100, horizon);
        } else {
            const inflationCumul = uiState?.resale?.inflationCumulative || 0;
            inflationFactor = 1 + (inflationCumul / 100);
        }
        const realNetBalance = bilanFinancierNet / inflationFactor;
        
        setTextEl(ui.res_resale_price, formatCurrency(prixRevente) + " €");
        setTextEl(ui.res_remaining_capital, formatCurrency(totalCRD) + " €");
        setTextEl(ui.res_ira_fees, formatCurrency(ira_fees) + " €");
        setTextEl(ui.res_resale_costs, formatCurrency(fraisRevente) + " €");
        setTextEl(ui.res_net_proceeds, formatCurrency(produitNet) + " €");
        setTextEl(ui.res_initial_apport, formatCurrency(apportInitial) + " €");
        setTextEl(ui.res_capital_amorti, formatCurrency(capitalAmorti) + " €");
        setTextEl(ui.res_total_wasted_costs, formatCurrency(interetsEtAssurancePayes) + " €");

        setTextEl(ui.res_bilan_patrimonial, formatCurrency(bilanPatrimonial) + " €");
        if (ui.res_bilan_patrimonial) ui.res_bilan_patrimonial.style.color = bilanPatrimonial >= 0 ? 'var(--primary-color)' : 'var(--danger-color)';

        setTextEl(ui.res_net_balance, formatCurrency(bilanFinancierNet) + " €");
        if (ui.res_net_balance) ui.res_net_balance.style.color = bilanFinancierNet >= 0 ? 'var(--primary-color)' : 'var(--danger-color)';

        setTextEl(ui.res_real_balance, formatCurrency(realNetBalance) + " €");
        if (ui.res_real_balance) ui.res_real_balance.style.color = realNetBalance >= 0 ? 'var(--primary-color)' : 'var(--danger-color)';
    }


    // === 5. INITIALISATION (Start App) ===
    function startApp() {
        ui = buildUI();
        const inputIds = [
            'P', 'FAg', 'M', 'FN', 'FD', 'Courtier', 'A', 'TE_20', 'TA_20', 'TE_25', 'TA_25', 'S', 
            'AutresCredits', 'AutresCharges', 'TEdt', 'RAV', 'T', 'FG_manual', 
            'pibRFR', 'pibHouseholdSize', 'pibBFMRate', 'pibDuration', 'pibInsuranceRate', 'ptbInsuranceRate',
            'ptbRFR', 'ptbHouseholdSize', 'ptbAmountWanted', 'ptbDuration', 
            'resaleHorizon', 'plusValue', 'inflation', 'resaleFees', 
            'resalePriceManual', 'inflationCumulative', 'ira_manual', 'ira_classic', 'ira_pib', 'ira_ptb'
        ];

        inputIds.forEach(id => {
            const numInput = getEl(`${id}_num`);
            const rangeInput = getEl(id);
            if(numInput && rangeInput) {
                inputs[id] = { slider: rangeInput, num: numInput };
                setupSliderAndNumber(id);
            }
        });
// Comportement sur-mesure quand on passe de Auto à Manuel (Frais de Notaire)
        getEl('FN_mode')?.addEventListener('change', (e) => {
            const isManual = e.target.value === 'manual';
            const fnSlider = getEl('FN');
            const fnNum = getEl('FN_num');
            const breakdown = getEl('fn_breakdown');
            const trigger = getEl('fnDetailsToggleTrigger');
            
            if (isManual) {
                // 1. On récupère le montant en euros actuel (caché dans le résumé)
                const currentEurosText = getEl('res_FN_montant')?.textContent || '0';
                const currentEuros = parseFloat(currentEurosText.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
                
                // 2. On passe le champ en mode "Euros" (Min 0, Max 100 000)
                setInputState('FN', true, { min: 0, max: 100000, step: 100 });
                
                // 3. On injecte les euros à la place de l'ancien pourcentage (ex: remplace 6.9 par 15000)
                if (fnSlider && fnNum) {
                    fnSlider.value = currentEuros;
                    fnNum.value = currentEuros;
                }
                
                // 4. On cache les détails inutiles
                breakdown?.classList.remove('visible');
                if (trigger) {
                    trigger.textContent = "Détails calcul auto. frais notaire ▼";
                    trigger.style.display = 'none';
                }
                
            } else {
                // Retour en mode Auto : On remet les limites pour un petit pourcentage
                setInputState('FN', false, { min: 0.5, max: 10, step: 0.1 });
                breakdown?.classList.add('visible');
                if (trigger) {
                    trigger.textContent = "Cacher détails calcul auto. frais notaire ▲";
                    trigger.style.display = 'inline';
                }
            }
            
            // On relance le calcul global pour que le pourcentage à droite s'ajuste immédiatement
            calculateAll();
        });
        [
            ui.form.typeBien,
            ui.form.typeGarantie,
            ui.form.enablePIB,
            ui.form.pibZone,
            ui.form.enablePTB,
            ui.form.ptbAgentStatus,
            ui.form.ptbZone,
            ui.form.resaleScenarioRef,
            ui.form.chargeAgence
        ].forEach(el => {
            if (el) el.addEventListener('change', calculateAll);
        });

        // Toggles pour la revente (Mode de saisie PV, Inflation, IRA)
        ui.form.pv_mode?.addEventListener('change', e => {
            setDisplayEl(ui.pv_annual_container, e.target.value === 'annual' ? 'flex' : 'none');
            setDisplayEl(ui.pv_manual_container, e.target.value === 'manual' ? 'flex' : 'none');
            calculateAll();
        });
        ui.form.inflation_mode?.addEventListener('change', e => {
            setDisplayEl(ui.inflation_annual_container, e.target.value === 'annual' ? 'flex' : 'none');
            setDisplayEl(ui.inflation_cumulative_container, e.target.value === 'cumulative' ? 'flex' : 'none');
            calculateAll();
        });
        ui.ira_mode?.addEventListener('change', e => {
            setDisplayEl(ui.ira_percentage_container, e.target.value === 'percentage' ? 'flex' : 'none');
            setDisplayEl(ui.ira_manual_container, e.target.value === 'manual' ? 'flex' : 'none');
            calculateAll();
        });

        // Tooltips
        document.body.addEventListener('mouseenter', e => {
            if (e.target.classList?.contains('info-icon')) {
                const tooltip = getEl('info-tooltip');
                if(!tooltip) return;
                tooltip.textContent = infoMessages[e.target.dataset.infoKey] || "Information non disponible.";
                tooltip.classList.add('visible');
                const rect = e.target.getBoundingClientRect();
                tooltip.style.left = `${Math.max(5, rect.left + window.scrollX - (tooltip.offsetWidth / 2))}px`;
                tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 5}px`;
            }
        }, true);
        
        document.body.addEventListener('mouseleave', e => {
            if (e.target.classList?.contains('info-icon')) {
                const tooltip = getEl('info-tooltip');
                if(tooltip) tooltip.classList.remove('visible');
            }
        }, true);

        setupDetailsToggle('fnDetailsToggleTrigger', 'fn_breakdown', "Détails calcul auto. frais notaire ▼", "Cacher détails calcul auto. frais notaire ▲");
        setupDetailsToggle('fgDetailsToggleTrigger', 'FG_details', "Détails garantie Prêt Classique ▼", "Cacher détails garantie Prêt Classique ▲");

        // Listener `FN_mode` unique : géré plus haut (évite double traitement)
        
        ui.form.typeGarantie?.addEventListener('change', (e) => {
            const isManualGuarantee = e.target.value === 'manual_guarantee';
            setDisplayEl(ui.manualGuaranteeInput, isManualGuarantee ? 'flex' : 'none');
            const details = ui.FG_details;
            const trigger = ui.fgDetailsToggleTrigger;
            if (details && trigger) {
                if (isManualGuarantee) {
                    details.classList.remove('visible');
                    trigger.style.display = 'none';
                } else {
                    trigger.style.display = 'block';
                    if (!details.classList.contains('visible')) details.classList.add('visible');
                    trigger.textContent = details.classList.contains('visible') ? "Cacher détails garantie Prêt Classique ▲" : "Détails garantie Prêt Classique ▼";
                }
            }
            calculateAll();
        });

        ui.form.enablePIB?.addEventListener('change', e => { setDisplayEl(ui.pibInputsContainer, e.target.checked ? 'block' : 'none'); calculateAll(); });
        ui.form.enablePTB?.addEventListener('change', e => { setDisplayEl(ui.ptbInputsContainer, e.target.checked ? 'block' : 'none'); calculateAll(); });
        ui.form.ptbAgentStatus?.addEventListener('change', e => { 
            const ptbZoneSlider = ui.form.ptbZone;
            if (ptbZoneSlider) ptbZoneSlider.disabled = (e.target.value === 'retraite'); 
            calculateAll();
        });

        document.querySelector('.modal-close-button')?.addEventListener('click', () => document.querySelector('.modal-overlay')?.classList.remove('visible'));
        document.querySelector('.modal-overlay')?.addEventListener('click', e => { if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('visible'); });

        document.body.addEventListener('click', e => {
            if (e.target.classList.contains('amort-button')) {
                const loanType = e.target.dataset.loanType;
                let schedule, loanName = "";
                
                const parseElFormatted = el => el ? (parseFloat(el.textContent.replace(/[^\d,.-]/g,'').replace(',','.')) || 0) : 0;
                
                const currentPtbAmount = parseElFormatted(ui?.ptb_res_amount);
                const currentPibAmount = parseElFormatted(ui?.pib_res_amount);
                const currentClassicLoanAmount = parseElFormatted(ui?.scen_classic_amount_display);
                const { state } = lireEtatFormulaire(ui);

                if (loanType==='ptb'&&currentPtbAmount>0) { 
                    loanName=`PTB (${state.ptbDuration}a)`; 
                    const zone = (state.ptbAgentStatus === 'retraite') ? 'A' : (state.ptbZone || 'A');
                    const thresholds = BONIFICATION_THRESHOLDS[zone];
                    const bonifRate = (thresholds && state.ptbRFR <= (thresholds[Math.min(state.ptbHouseholdSize, 5)] || 0)) ? 3 : 2;
                    schedule=generateAmortizationSchedule("PTB",currentPtbAmount,Math.max(0, state.pibBFMRate - bonifRate),state.ptbDuration,state.ptbInsuranceRate); 
                }
                else if (loanType==='pib'&&currentPibAmount>0) { 
                    loanName=`PIB (${state.pibDuration}a)`; 
                    const thresholds = BONIFICATION_THRESHOLDS[state.pibZone || 'A'];
                    const bonifRate = (thresholds && state.pibRFR <= (thresholds[Math.min(state.pibHouseholdSize, 5)] || 0)) ? 3 : 2;
                    schedule=generateAmortizationSchedule("PIB",currentPibAmount,Math.max(0, state.pibBFMRate - bonifRate),state.pibDuration,state.pibInsuranceRate); 
                }
                else if (loanType==='classic_20'&&currentClassicLoanAmount>0) { 
                    loanName=`Classique (20a)`; 
                    schedule=generateAmortizationSchedule("Classique 20a",currentClassicLoanAmount,state.TE_20,20,state.TA_20); 
                }
                else if (loanType==='classic_25'&&currentClassicLoanAmount>0) { 
                    loanName=`Classique (25a)`; 
                    schedule=generateAmortizationSchedule("Classique 25a",currentClassicLoanAmount,state.TE_25,25,state.TA_25); 
                }

                if (schedule && schedule.length > 0) displayAmortizationModal(loanName, schedule);
                else { 
                    setHTMLEl(ui?.amortizationTableContainer, "<p>Données non disponibles ou montant nul.</p>"); 
                    setTextEl(ui?.amortizationModalTitle, "Erreur"); 
                    document.querySelector('.modal-overlay')?.classList.add('visible'); 
                }
            }
        });

        // Initialisation correcte de l'état du slider Frais de Notaire au démarrage
        const modeFN = ui.form.FN_mode?.value || 'auto';
        const isManualFN = modeFN === 'manual';
        setInputState('FN', isManualFN, { min: isManualFN ? 0 : 0.5, max: isManualFN ? 100000 : 10, step: isManualFN ? 100 : 0.1 });
        
        if(isManualFN) {
            ui.fn_breakdown?.classList.remove('visible');
            setDisplayEl(ui.fnDetailsToggleTrigger, 'none');
        }
        const modeGar = ui.form.typeGarantie?.value;
        if(modeGar === 'manual_guarantee') {
            ui.FG_details?.classList.remove('visible');
            setDisplayEl(ui.fgDetailsToggleTrigger, 'none');
            setDisplayEl(ui.manualGuaranteeInput, 'flex');
        }

        // Bouton de réinitialisation
        ui.btn_reset?.addEventListener('click', () => {
            if (confirm("Voulez-vous vraiment réinitialiser toutes les données et repartir de zéro ?")) {
                localStorage.removeItem('simuImmoDGAC_sauvegarde');
                window.location.reload(); // Recharge la page à neuf
            }
        });
        chargerEtat(); // On recharge les données avant de lancer le premier calcul
        calculateAll();
    }

    startApp();
});
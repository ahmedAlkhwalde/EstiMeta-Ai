<?php

namespace App\Services;

class EstimationService
{
/**
     * حساب نقاط الوظيفة (Final FP)  على معايير 
     */
    public function calculateFP($data) {
      
        $weight_ei  = 4; 
        $weight_eo  = 5; 
        $weight_eq  = 4; 
        $weight_ilf = 10; 
        $weight_eif = 7; 

        $ufp = ($data['ei']  * $weight_ei)  + 
               ($data['eo']  * $weight_eo)  + 
               ($data['eq']  * $weight_eq)  + 
               ($data['ilf'] * $weight_ilf) + 
               ($data['eif'] * $weight_eif); 

       
        $tdi = 30; 

      
        // AFP = UFP * (0.65 + (0.01 * TDI))
        return $ufp * (0.65 + (0.01 * $tdi)); 
    }

    /**
     * حساب نقاط حالات الاستخدام (Final UCP) بناءً على قوانين المحاضرة الثانية
     */
    public function calculateUCP($data) {
        // 1. حساب النقاط غير المعدلة: UUCP = UAW + UUCW
        $uucp = $data['uaw'] + $data['uucw']; // [cite: 491, 577]

        
        $t_factor = 25; // مجموع حاصل ضرب الأوزان بالتقييم الفعلي للمشاريع المتوسطة 
        $tcf = 0.6 + (0.01 * $t_factor); 

  
       
        $e_factor = 18; // المجموع الفعلي الحقيقي الحذر لمنع هبوط أو صعود النقاط بشكل حاد 
        $ecf = 1.4 + (-0.03 * $e_factor); 

        
        // UCP = UUCP * TCF * ECF
        return $uucp * $tcf * $ecf; //
    }

    /**
     * تقدير الجهد التراكمي الفعلي بالساعات (Effort in Man-Hours)
     */
    public function estimateEffort($ucp) {
       
       
        $pf = 2; 
        
        return $ucp * $pf; 
    }
}
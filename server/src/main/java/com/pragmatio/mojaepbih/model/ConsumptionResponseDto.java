package com.pragmatio.mojaepbih.model;

import com.pragmatio.mojaepbih.classes.Year;
import com.pragmatio.mojaepbih.model.entity.Consumption;
import lombok.Data;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

@Data
public class ConsumptionResponseDto {
    List<Consumption> consumptions;
    List<Year> years = new ArrayList<>();

    public ConsumptionResponseDto(List<Consumption> consumptions, List<Integer> years) {
        this.consumptions = consumptions;
        for(int i=0; i<years.size(); i++) {
            Year year = new Year(years.get(i));
            this.years.add(year);
        }
    }
}

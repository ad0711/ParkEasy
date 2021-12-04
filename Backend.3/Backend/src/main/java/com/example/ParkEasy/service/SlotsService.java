package com.example.ParkEasy.service;

import java.util.List;
import java.util.Optional;

import com.example.ParkEasy.model.Slots;

public interface SlotsService {

	Slots saveSlots(Slots slot);

	Optional<Slots> getSlot(long id);

	List<Slots> getAllSlots();

	Slots updateSlots(Slots slot, long id, String chosenFeatures);

}

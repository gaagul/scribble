# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  include ActionView::Helpers::TranslationHelper

  def errors_to_sentence
    errors.full_messages.to_sentence
  end
end

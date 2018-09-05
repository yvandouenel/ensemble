<?php

namespace Drupal\ensemble_migrate\Plugin\migrate\source;

use Drupal\migrate\Plugin\migrate\source\SqlBase;
use Drupal\migrate\Row;

/**
 * Plugin de source pour les articles.
 *
 * @MigrateSource(
 *   id = "ensemble_dc_article"
 * )
 */
class EnsembleArticle extends SqlBase {

  /**
   * {@inheritdoc}
   */
  public function query() {
    $fields = [
      'post_id',
      'cat_id',
      'post_dt',
      'post_tz',
      'post_creadt',
      'post_upddt',
      'post_url',
      'post_title',
      'post_excerpt',
      'post_content',
      'post_status',
      'post_selected',
      'post_open_tb',
    ];
    return $this->select('dc2_post', 'b')
      ->fields('b', $fields)
      ->condition('post_type', 'post');
  }

  /**
   * {@inheritdoc}
   */
  public function fields() {
    return [
      'post_id' => $this->t('Post ID'),
      'cat_id' => $this->t('Category ID'),
      'post_dt' => $this->t('Actual publication date'),
      'post_tz' => $this->t('Publication timezone'),
      'post_creadt' => $this->t('Alternate publication date'),
      'post_upddt' => $this->t('Last time this post was updated'),
      'post_url' => $this->t('Post path'),
      'post_title' => $this->t('Post title'),
      'post_excerpt' => $this->t('Post excerpt'),
      'post_content' => $this->t('Post content'),
      'post_status' => $this->t('Post status'),
      'post_selected' => $this->t('Post is selected'),
      'post_open_tb' => $this->t('Trackbacks are open'),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getIds() {
    return [
      'post_id' => [
        'type' => 'integer',
        'alias' => 'post_id',
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function prepareRow(Row $row) {
    // Dates sous la forme de timestamps.
    $created = $row->getSourceProperty('post_dt');
    $updated = $row->getSourceProperty('post_upddt');
    $tz = $row->getSourceProperty('post_tz');
    $row->setSourceProperty('post_dt', strtotime($created . ' ' . $tz));
    $row->setSourceProperty('post_upddt', strtotime($updated . ' ' . $tz));
  }

}
